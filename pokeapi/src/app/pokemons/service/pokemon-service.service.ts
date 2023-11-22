import { Injectable } from '@angular/core';
import { Pokemon, PokemonResponse, PokemonRow, Result, Species } from '../interface/pokemon.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  public pokemonListRaw: PokemonRow[] = [];
  private pokemonListResult: Result[] = [];
  private pokeApi: string = 'https://pokeapi.co/api/v2/';
  private imagePokemon: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private typesPokemon: string = 'https://pokeapi.co/api/v2/type/';
  public typesList: string[] = [];
  pokemonListService: any;

  constructor(private http: HttpClient) { }

  searchPokemonList(limit: number = 10): Observable<void> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', '0');
    return this.http.get<PokemonResponse>(`${this.pokeApi}pokemon`, { params }).pipe(
      map(res => {
        this.pokemonListResult = res.results;
      })
    );
  }

  createListOfPokemons(limit: number): Observable<void> {
    return this.searchPokemonList(limit).pipe(
      mergeMap(() => {
        const observables: Observable<PokemonRow>[] = [];

        for (const result of this.pokemonListResult) {
          const observable = forkJoin([
            this.searchPokemonName(result),
            this.searchPokemonImage(result)
          ]).pipe(
            map(([pokemonData, image]) => ({
              name: pokemonData.name,
              first_types: pokemonData.types[0].type.name,
              second_types: pokemonData.types[1] ? pokemonData.types[1].type.name : '',
              attack: pokemonData.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
              image: image
            } as PokemonRow))
          );

          observables.push(observable);
        }

        return forkJoin(observables).pipe(
          map((pokemonRows: PokemonRow[]) => {
            this.pokemonListRaw = pokemonRows;
          })
        );
      })
    );
  }

  searchPokemonTypes(): Observable<string[]> {
    return this.http.get<PokemonResponse>(this.typesPokemon).pipe(
      map((res) => res.results.map((type) => type.name))
    );
  }

  searchPokemonName(tag: Result): Observable<Pokemon> {
    return this.http.get<Pokemon>(tag.url);
  }

  searchPokemonImage(tag: Result): Observable<string> {
    const parts = tag.url.split('/');
    const imageUrl = this.imagePokemon + parts[parts.length - 2] + '.png';
    return new Observable<string>((observer) => {
      observer.next(imageUrl);
      observer.complete();
    });
  }

}
