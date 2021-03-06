import { observable, action, autorun, reaction } from "mobx"
import { Card } from "./Card"
import { DeckManager } from "./DeckManager"
import { setupPersistence } from "../Infra/Persistence"
import { serializable, map, object, list } from "serializr"
import { Logger } from "../Infra/Logger"

function removeFromArray(array:Card[], item: Card) {
  const index = array.findIndex(curItem => curItem.id == item.id)
  index >= 0 && array.splice(index, 1)
}

export enum Stack {
  HAND = "HAND", 
  IN_PLAY = "IN_PLAY", 
  ACTIVE = "ACTIVE", 
  DISCARD = "DISCARD", 
  LOST = "LOST"
}

export class PlayingManager {

  private deckManager: DeckManager

  @serializable(map(list(object(Card))))
  @observable
  private stackToCards: Map<Stack, Card[]> = new Map()

  private cardToStack: Map<string, Stack> = new Map()

  constructor(deckManager: DeckManager) {
    this.deckManager = deckManager

    Object.keys(Stack).forEach((stack: keyof typeof Stack) => {
      this.stackToCards.set(Stack[stack], [])
    })

    setupPersistence(this, "game")

    
    this.stackToCards.forEach((cards, stack) => {
      // // HACK corrects persistence treating enum as string instead of int
      // this.stackToCards.delete(stack)
      // const stackInt = parseInt(stack as any) as Stack
      // this.stackToCards.set(stackInt, cards)

      // Build the reverse index (it's not persisted)
      cards.forEach((card) => this.cardToStack.set(card.id, stack))
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

  getIndexInStackForCard(card: Card) : number {
    const cardsInStack = this.getCardsForStack(this.getStackForCard(card))
    return cardsInStack.findIndex(curCard => curCard.id === card.id)
  }

  getStackLengthForCard(card: Card) : number {
    const cardsInStack = this.getCardsForStack(this.getStackForCard(card))
    return cardsInStack.length
  }

  @action
  newGame() {
    this.deckManager.selectedCards.forEach((card) => this.moveCard(card, Stack.HAND))
  }

  @action
  moveCard(cardToMove: Card, toStack: Stack) {
    const currentStack = this.cardToStack.get(cardToMove.id)
    if (currentStack === undefined) {
      Logger.error("Cannot move card not already in the deck")
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

  @action
  setIndexInStackForCard(card: Card, index: number) : void {
    const cardsInStack = this.getCardsForStack(this.getStackForCard(card))
    removeFromArray(cardsInStack, card)
    cardsInStack.splice(index, 0, card)
  }

  @action
  swapInPlayOrder() : void {
    const cardsInPlay = this.stackToCards.get(Stack.IN_PLAY)
    this.stackToCards.set(Stack.IN_PLAY, cardsInPlay.slice().reverse())
  }

  randomDiscardCard() : Card {
    const cardsInDiscard = this.stackToCards.get(Stack.DISCARD)
    const randomIndex = Math.floor(Math.random() * cardsInDiscard.length);
    return cardsInDiscard[randomIndex]
  }

}