import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PokemonRow, Species } from '../../interface/pokemon.interfaces';
import { PokemonServiceService } from '../../service/pokemon-service.service';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

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
  creation: boolean = false;
  public types: string[] = [];
  @ViewChild(PokemonListComponent) pokemonListComponent: PokemonListComponent | undefined;

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
    this.pokemonService.searchPokemonTypes().subscribe(
      (typeNames) => {
        this.types = typeNames;
        console.log(this.types);
      },
      (error) => {
        console.error('Error fetching Types data:', error);
      }
    );
  }


  onEditPokemonMain(event: { index: number, pokemon: PokemonRow }): void {
    this.selectedIndex = event.index;
    this.selectedPokemon = event.pokemon;
    if (this.selectedPokemon) {
      this.pokemonEdited = { ...this.selectedPokemon };
    }
  }

  public pokemonEdited: PokemonRow = {
    name: '',
    attack: 0,
    first_types: '',
    second_types: '',
    image: ''
  };

  cancelOperationEditPokemon(){
    this.selectedIndex = null;
    this.selectedPokemon = null;
    this.pokemonListComponent!.pokemonSetEditing();
  }

  hideFormIfNoEditPokemon(){
    if (this.selectedIndex != null && this.selectedPokemon != null || this.creation !=  false){
      return true
    }
    return false
  }

  permitEditNameIfCreation(){
    if (this.creation){
      return true;
    }
    return false
  }


  emitPokemon():void{
    if (this.selectedIndex != null && this.selectedPokemon != null){
      if (this.pokemonListComponent) {
        this.pokemonListComponent!.updatePokemon(this.pokemonEdited, this.selectedIndex);
      }
      this.selectedIndex = null
      this.selectedPokemon = null;
      this.pokemonEdited.attack = 0;
      this.pokemonEdited.first_types = '';
      this.pokemonEdited.second_types = '';
      this.pokemonEdited.image = '';
    }
  }
}


