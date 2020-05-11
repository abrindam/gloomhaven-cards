import { observable, action } from "mobx"
import { setupPersistence } from "../Infra/Persistence"
import { serializable } from "serializr"

export enum SetupState {
  CHOOSE_CHARACTER = "CHOOSE_CHARACTER", 
  CHOOSE_DECK = "CHOOSE_DECK" , 
  CHOOSE_ATTACK_DECK = "CHOOSE_ATTACK_DECK",
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
  changeAttackDeck() {
    this.setupState = SetupState.CHOOSE_ATTACK_DECK
  }

  @action
  changeCharacter() {
    this.setupState = SetupState.CHOOSE_CHARACTER
  }
}