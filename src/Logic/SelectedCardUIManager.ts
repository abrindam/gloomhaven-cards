import { observable, action } from "mobx"
import { Card } from "./Card"

export class SelectedCardUIManager {

  @observable
  selectedCard: Card = null

  @action
  selectCard(card: Card) {
    this.selectedCard = card
  }
}