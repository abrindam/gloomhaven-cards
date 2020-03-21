import { observable, action } from "mobx"
import { Card } from "./Card"

export enum Stack {
  HAND, IN_PLAY, ACTIVE, DISCARD, LOST
}

export class CardStackManager {

  @observable
  private stackToCards: Map<Stack, Card[]> = new Map()

  private cardToStack: Map<string, Stack> = new Map()

  constructor() {
    Object.keys(Stack).forEach((stack: keyof typeof Stack) => {
      this.stackToCards.set(Stack[stack], [])
    })
  }

  getCardsForStack(stack: Stack) : Card[] {
    return this.stackToCards.get(stack)
  }

  getStackForCard(card: Card) : Stack {
    return this.cardToStack.get(card.id)
  }

  @action
  moveCard(cardToMove: Card, toStack: Stack) {
    const currentStack = this.cardToStack.get(cardToMove.id)
    if (currentStack !== undefined) {
      const newList = this.stackToCards.get(currentStack).filter((card) => cardToMove != card)
      this.stackToCards.set(currentStack, newList)
    }
    this.cardToStack.set(cardToMove.id, toStack)
    this.stackToCards.get(toStack).push(cardToMove)
  }

}