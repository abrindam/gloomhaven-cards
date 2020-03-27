import { Card } from "./Card";
import { computed, action, observable } from "mobx";

export class DeckManager {

  @observable
  unselectedCards: Card[] = []

  @observable
  selectedCards: Card[] = []
  
  @action
  selectCard(card: Card) {
    this.swapCard(card, this.unselectedCards, this.selectedCards)
  }

  @action
  unselectCard(card: Card) {
    this.swapCard(card, this.selectedCards, this.unselectedCards)
  }

  private swapCard(card: Card, from: Card[], to: Card[]) {
    let index = from.findIndex((curCard) => card.id == curCard.id)
    if (index == -1) {
      return
    }

    from.splice(index, 1)
    to.push(card)
  }

}