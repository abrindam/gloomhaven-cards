import { PlayingManager } from "./Logic/PlayingManager";
import { SelectedCardUIManager } from "./Logic/SelectedCardUIManager";
import { DeckManager } from "./Logic/DeckManager";
import { SetupStateUIManager } from "./Logic/SetupStateUIManager";

export class Container {

  deckManager: DeckManager
  playingManager: PlayingManager
  selectedCardUIManager: SelectedCardUIManager
  setupStateUIManager: SetupStateUIManager;

  constructor() {
    this.deckManager = new DeckManager()
    this.playingManager = new PlayingManager(this.deckManager)
    this.setupStateUIManager = new SetupStateUIManager()
    this.selectedCardUIManager = new SelectedCardUIManager()
  }
}