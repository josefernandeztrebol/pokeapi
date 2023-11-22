import { Component } from '@angular/core';

@Component({
  selector: 'pokemons-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  public name: string = 'bulbasur';
  public attack: number = 45;
  public types: string[] = ['melchor', 'baltasar']
  public image: string = ''

  private allTypes: string[] = ['melchor', 'baltasar', 'WAKA']
  changePokemonAttack(attackParameter: number):void{
    this.attack = attackParameter;
  }
  changePokemonType():void{

  }
  changePokemonImage():void{}

}
