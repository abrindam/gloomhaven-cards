import { PlayingManager } from "./Logic/PlayingManager";
import { SelectedCardUIManager } from "./Logic/SelectedCardUIManager";
import { DeckManager } from "./Logic/DeckManager";
import { SetupStateUIManager } from "./Logic/SetupStateUIManager";
import { GloomhavenDataService } from "./Logic/GloomhavenDataService";
import { CharacterManager } from "./Logic/CharacterManager";
import { AttackDeckManager } from "./Logic/AttackDeckManager";
import { PlayingAttackDeckManager } from "./Logic/PlayingAttackDeckManager";

export class Container {

  gloomhavenDataService: GloomhavenDataService
  characterManager: CharacterManager;
  deckManager: DeckManager
  attackDeckManager: AttackDeckManager
  playingManager: PlayingManager
  playingAttackDeckManager: PlayingAttackDeckManager
  selectedCardUIManager: SelectedCardUIManager
  setupStateUIManager: SetupStateUIManager;

  constructor() {
    this.gloomhavenDataService = new GloomhavenDataService()
    this.characterManager = new CharacterManager(this.gloomhavenDataService)
    this.deckManager = new DeckManager(this.characterManager)
    this.attackDeckManager = new AttackDeckManager(this.characterManager)
    this.playingManager = new PlayingManager(this.deckManager)
    this.playingAttackDeckManager = new PlayingAttackDeckManager(this.attackDeckManager, this.characterManager)
    this.setupStateUIManager = new SetupStateUIManager()
    this.selectedCardUIManager = new SelectedCardUIManager()
  }
}