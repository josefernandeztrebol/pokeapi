import { Component, OnInit } from '@angular/core';
import { PokemonRow } from '../../interface/pokemon.interfaces';
import { PokemonServiceService } from '../../service/pokemon-service.service';

@Component({
  selector: 'pokemons-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public pokemons: PokemonRow[] = [];
  public limit: number = 10;
  selectedIndex: number | null = null;
  selectedPokemon: PokemonRow | null = null;
  constructor(private pokemonService: PokemonServiceService) {}

  ngOnInit() {
    this.fetchPokemonData(this.limit);
  }



  fetchPokemonData(limit: number) {
    if (limit === 0) {
      return;
    }
    this.pokemonService.createListOfPokemons(limit).subscribe(
      () => {
        this.pokemons = this.pokemonService.pokemonListRaw;
      },
      (error) => {
        console.error('Error fetching Pokemon data:', error);
      }
    );
  }

  onNewPokemon(newPokemon: PokemonRow): void {
    console.log(newPokemon);
  }

  updatePokemon(updatedPokemon: PokemonRow): void {
    if (this.selectedIndex === null) return;
    this.pokemons[this.selectedIndex] = updatedPokemon;
    this.selectedIndex = null;
    this.selectedPokemon = null;
  }

  onEditPokemon(event: { index: number, pokemon: PokemonRow }): void {
    this.selectedIndex = event.index;
    this.selectedPokemon = { ...event.pokemon };
  }
}


