import { observable, action } from "mobx"
import { Card } from "./Card"
import { Logger } from "../Infra/Logger"

export class SelectedCardUIManager {

  @observable
  selectedCard: Card | null = null

  @action
  selectCard(card: Card) {
    this.selectedCard = card
    if (card) {
      Logger.log(`Selected card ${card.id}`)
    } else {
      Logger.log("Unselected card")
    }
  }
}