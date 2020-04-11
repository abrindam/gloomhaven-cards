import { PlayingManager } from "./Logic/PlayingManager";
import { SelectedCardUIManager } from "./Logic/SelectedCardUIManager";
import { DeckManager } from "./Logic/DeckManager";
import { SetupStateUIManager } from "./Logic/SetupStateUIManager";
import { GloomhavenDataService } from "./Logic/GloomhavenDataService";
import { CharacterManager } from "./Logic/CharacterManager";

export class Container {

  gloomhavenDataService: GloomhavenDataService
  characterManager: CharacterManager;
  deckManager: DeckManager
  playingManager: PlayingManager
  selectedCardUIManager: SelectedCardUIManager
  setupStateUIManager: SetupStateUIManager;

  constructor() {
    this.gloomhavenDataService = new GloomhavenDataService()
    this.characterManager = new CharacterManager(this.gloomhavenDataService)
    this.deckManager = new DeckManager(this.characterManager)
    this.playingManager = new PlayingManager(this.deckManager)
    this.setupStateUIManager = new SetupStateUIManager()
    this.selectedCardUIManager = new SelectedCardUIManager()
  }
}