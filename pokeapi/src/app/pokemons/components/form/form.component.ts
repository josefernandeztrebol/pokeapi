import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonRow } from '../../interface/pokemon.interfaces';

@Component({
  selector: 'pokemons-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output()
  public onNewPokemon: EventEmitter<PokemonRow> = new EventEmitter();
  @Input()
  public pokemonToEdit!: PokemonRow

  public typesSelector: string[] = ['bublasur', 'fuego']
  public pokemon: PokemonRow = {
    name: '',
    attack: 0,
    first_types: '',
    second_types: '',
    image: ''
  };

  editPokemon():void{

  }

  emitPokemon():void{
    this.onNewPokemon.emit(this.pokemon);
    this.pokemon.attack = 0;
    this.pokemon.first_types = '';
    this.pokemon.second_types = '';
    this.pokemon.image = '';
  }
}
