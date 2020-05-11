import { observable, action } from "mobx"
import { setupPersistence } from "../Infra/Persistence"
import { serializable } from "serializr"
import { Logger } from "../Infra/Logger"

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
    Logger.log("Now playing")
  }

  @action
  changeDeck() {
    this.setupState = SetupState.CHOOSE_DECK
    Logger.log("Now choosing deck")
  }

  @action
  changeAttackDeck() {
    this.setupState = SetupState.CHOOSE_ATTACK_DECK
    Logger.log("Now choosing attack deck")
  }

  @action
  changeCharacter() {
    this.setupState = SetupState.CHOOSE_CHARACTER
    Logger.log("Now choosing character")
  }
}