// pokemon-list.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonRow } from '../pokemons/interface/pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private pokemonListSubject: BehaviorSubject<PokemonRow[]> = new BehaviorSubject<PokemonRow[]>([]);
  public pokemonList$: Observable<PokemonRow[]> = this.pokemonListSubject.asObservable();

  updatePokemonList(pokemonList: PokemonRow[]): void {
    this.pokemonListSubject.next(pokemonList);
  }
}
