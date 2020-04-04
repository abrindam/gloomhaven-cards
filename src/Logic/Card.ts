import { observable } from "mobx"
import { serializable } from "serializr"

export class Card {

  @serializable
  readonly id: string
  
  @serializable
  @observable
  markerLocation: [number, number]

  constructor(id: string) {
    this.id = id
  }
}