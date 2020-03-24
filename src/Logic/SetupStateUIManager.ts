import { observable, action } from "mobx"

export enum SetupState {
  CHOOSE_DECK, PLAYING
}

export class SetupStateUIManager {

  @observable
  setupState: SetupState = SetupState.CHOOSE_DECK

  @action
  chooseDeckDone() {
    this.setupState = SetupState.PLAYING
  }
}