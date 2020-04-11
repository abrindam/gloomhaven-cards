import { observable } from "mobx"
import { serializable, object, primitive, custom } from "serializr"
import { CharacterAbilityCard, Character } from "./GloomhavenDataService"

export class Card {

  @serializable
  readonly id: string

  @serializable
  readonly imageBasename: string

  @serializable(custom((val) => val, (val) => val))
  readonly character: Character
  
  @serializable
  @observable
  markerLocation: [number, number]
  

  constructor(id: string, imageBasename: string, character: Character) {
    this.id = id
    this.imageBasename = imageBasename
    this.character = character
  }

}