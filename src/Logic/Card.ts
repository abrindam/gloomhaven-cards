import { observable } from "mobx"
import { serializable, object, primitive, custom } from "serializr"
import { CharacterAbilityCard, Character } from "./GloomhavenDataService"
import { literal } from "../Infra/Persistence"

export class Card {

  @serializable
  readonly id: string

  @serializable
  readonly imageBasename: string

  @serializable(literal())
  readonly character: Character
  
  @serializable(literal())
  @observable
  markerLocation: [number, number]
  

  constructor(id: string, imageBasename: string, character: Character) {
    this.id = id
    this.imageBasename = imageBasename
    this.character = character
  }

}