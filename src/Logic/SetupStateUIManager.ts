import { observable, action } from "mobx"
import { setupPersistence } from "./Persistence"
import { serializable } from "serializr"

export enum SetupState {
  CHOOSE_CHARACTER = "CHOOSE_CHARACTER", 
  CHOOSE_DECK = "CHOOSE_DECK" , 
  PLAYING = "PLAYING"
}

export class SetupStateUIManager {

  @serializable
  @observable
  setupState: SetupState = SetupState.CHOOSE_CHARACTER

  constructor() {
    setupPersistence(this, "setupState")
  }

  @action
  play() {
    this.setupState = SetupState.PLAYING
  }

  @action
  changeDeck() {
    this.setupState = SetupState.CHOOSE_DECK
  }

  @action
  changeCharacter() {
    this.setupState = SetupState.CHOOSE_CHARACTER
  }
}