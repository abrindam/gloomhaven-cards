import { observable, action, autorun, reaction } from "mobx"
import { Card } from "./Card"
import { DeckManager } from "./DeckManager"

function removeFromArray<T>(array:T[], item: T) {
  const index = array.indexOf(item)
  index >= 0 && array.splice(index, 1)
}

export enum Stack {
  HAND, IN_PLAY, ACTIVE, DISCARD, LOST
}

export class PlayingManager {

  private deckManager: DeckManager

  @observable
  private stackToCards: Map<Stack, Card[]> = new Map()

  private cardToStack: Map<string, Stack> = new Map()

  constructor(deckManager: DeckManager) {
    this.deckManager = deckManager

    Object.keys(Stack).forEach((stack: keyof typeof Stack) => {
      this.stackToCards.set(Stack[stack], [])
    })

    autorun(() => {
      const inDeck = new Set<String>()
      this.deckManager.selectedCards.forEach((card) => inDeck.add(card.id))

      const alreadyInStack = new Set<String>()
      this.stackToCards.forEach((cards) => {
        cards.forEach((card) => {
          alreadyInStack.add(card.id) 
          if (!inDeck.has(card.id)) {
            this.removeCard(card)
          }
        })
      })      
      
      const toAdd = deckManager.selectedCards.filter((card) => !alreadyInStack.has(card.id))
      toAdd.forEach((card) => this.moveOrAddCard(card, Stack.HAND))
    })
  }

  getCardsForStack(stack: Stack) : Card[] {
    return this.stackToCards.get(stack)
  }

  getStackForCard(card: Card) : Stack {
    return this.cardToStack.get(card.id)
  }

  moveCard(cardToMove: Card, toStack: Stack) {
    const currentStack = this.cardToStack.get(cardToMove.id)
    if (currentStack === undefined) {
      console.log("ERROR: Cannot move card not already in the deck")
      return  
    }
    return this.moveOrAddCard(cardToMove, toStack)
  }

  @action
  private moveOrAddCard(cardToMove: Card, toStack: Stack) {
    const currentStack = this.cardToStack.get(cardToMove.id)
    if (currentStack !== undefined) {
      removeFromArray(this.stackToCards.get(currentStack), cardToMove)
    }
    this.cardToStack.set(cardToMove.id, toStack)
    this.stackToCards.get(toStack).push(cardToMove)
  }

  @action
  private removeCard(cardToRemove: Card) {
    const currentStack = this.cardToStack.get(cardToRemove.id)
    this.cardToStack.delete(cardToRemove.id)
    removeFromArray(this.stackToCards.get(currentStack), cardToRemove)
  }

}