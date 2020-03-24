import { observable } from "mobx"

export class Card {

  readonly id: string
  
  @observable
  markerLocation: [number, number]

  constructor(id: string) {
    this.id = id
  }
}