import { observable, action } from "mobx"
import { setupPersistence } from "./Persistence"
import { serializable } from "serializr"

export enum SetupState {
  CHOOSE_DECK, PLAYING
}

export class SetupStateUIManager {

  @serializable
  @observable
  setupState: SetupState = SetupState.CHOOSE_DECK

  constructor() {
    setupPersistence(this, "setupState")
  }

  @action
  chooseDeckDone() {
    this.setupState = SetupState.PLAYING
  }

  @action
  changeDeck() {
    this.setupState = SetupState.CHOOSE_DECK
  }
}