import { CardStackManager } from "./Logic/CardStackManager";
import { SelectedCardUIManager } from "./Logic/SelectedCardUIManager";

export class Container {

  cardStackManager: CardStackManager
  selectedCardUIManager: SelectedCardUIManager

  constructor() {
    this.cardStackManager = new CardStackManager()
    this.selectedCardUIManager = new SelectedCardUIManager()
  }
}