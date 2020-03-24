import { CardStackManager } from "./Logic/CardStackManager";
import { SelectedCardUIManager } from "./Logic/SelectedCardUIManager";
import { DeckManager } from "./Logic/DeckManager";

export class Container {

  deckManager: DeckManager
  cardStackManager: CardStackManager
  selectedCardUIManager: SelectedCardUIManager

  constructor() {
    this.deckManager = new DeckManager()
    this.cardStackManager = new CardStackManager(this.deckManager)
    this.selectedCardUIManager = new SelectedCardUIManager()
  }
}