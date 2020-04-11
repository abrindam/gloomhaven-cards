import { Card } from "./Card";
import { computed, action, observable, autorun } from "mobx";
import { setupPersistence } from "./Persistence";
import { serializable, list, object, serialize } from "serializr"
import { GloomhavenDataService } from "./GloomhavenDataService";
import { CharacterManager } from "./CharacterManager";

function removeFromArray<T>(array:T[], item: T) {
  const index = array.indexOf(item)
  index >= 0 && array.splice(index, 1)
}

export class DeckManager {

  
  @observable
  unselectedCards: Card[] = []

  @serializable(list(object(Card)))
  @observable
  selectedCards: Card[] = []

  constructor(characterManager: CharacterManager) {
    
    setupPersistence(this, "deck")

    this.unselectedCards = this.unselectedCards.filter((card) => {
      return !this.selectedCards.find((curCard) => card.id == curCard.id)
    })

    autorun(() => {
      const eligible = new Set<String>()
      characterManager.characterCards.forEach((card) => eligible.add(card.id))

      const alreadyInStack = new Set<String>()
      ;[this.unselectedCards, this.selectedCards].forEach((cards) => {
        cards.forEach((card) => {
          alreadyInStack.add(card.id) 
          if (!eligible.has(card.id)) {
            this.removeCard(card)
          }
        })
      })      
      
      const toAdd = characterManager.characterCards.filter((card) => !alreadyInStack.has(card.id))
      toAdd.forEach((card) => this.addCard(card, this.unselectedCards))
    })
  }
  
  @action
  selectCard(card: Card) {
    this.swapCard(card, this.unselectedCards, this.selectedCards)
  }

  @action
  unselectCard(card: Card) {
    this.swapCard(card, this.selectedCards, this.unselectedCards)
  }


  @action
  private addCard(card: Card, to: Card[]) {
    to.push(card)
  }

  @action
  private removeCard(cardToRemove: Card) {
    removeFromArray(this.unselectedCards, cardToRemove)
    removeFromArray(this.selectedCards, cardToRemove)
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