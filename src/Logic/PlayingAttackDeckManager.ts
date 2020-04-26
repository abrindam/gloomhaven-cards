import { observable, action, autorun, reaction, computed } from "mobx"
import { Card } from "./Card"
import { DeckManager } from "./DeckManager"
import { setupPersistence } from "./Persistence"
import { serializable, map, object, list } from "serializr"
import { AttackDeckManager } from "./AttackDeckManager"
import { AttackModifier } from "./AttackModifier"
import { CharacterAttackModifierType } from "./GloomhavenDataService"
import { CharacterManager } from "./CharacterManager"

function removeFromArray(array:AttackModifier[], item: AttackModifier) {
  const index = array.findIndex(curItem => curItem.id == item.id)
  index >= 0 && array.splice(index, 1)
}

function shuffle<T>(array: T[]) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
};

export class PlayingAttackDeckManager {

  private attackDeckManager: AttackDeckManager
  private characterManager: CharacterManager

  @serializable(list(object(AttackModifier)))
  @observable
  drawnAttackModifiers: AttackModifier[] = []

  @serializable(list(object(AttackModifier)))
  @observable
  undrawnAttackModifiers: AttackModifier[] = []

  @serializable
  @observable
  turnInProgress: boolean = false

  @serializable
  private shuffleOnEndOfTurn: boolean = false

  @computed get blessesInDeck(): number {
    return this.undrawnAttackModifiers.filter(attackModifier => attackModifier.type == CharacterAttackModifierType.BLESS).length
  }

  @computed get cursesInDeck(): number {
    return this.undrawnAttackModifiers.filter(attackModifier => attackModifier.type == CharacterAttackModifierType.CURSE).length
  }
  
  constructor(attackDeckManager: AttackDeckManager, characterManager: CharacterManager) {
    this.attackDeckManager = attackDeckManager
    this.characterManager = characterManager

    setupPersistence(this, "gameAttackDeck")

    this.undrawnAttackModifiers = this.undrawnAttackModifiers.filter((attackModifier) => {
      return !this.drawnAttackModifiers.find((curAttackModifier) => attackModifier.id == curAttackModifier.id)
    })

    autorun(() => {
      const eligible = new Set<String>()
      attackDeckManager.selectedAttackModifiers.forEach((attackModifier) => eligible.add(attackModifier.id))

      const alreadyInStack = new Set<String>()
      ;[this.undrawnAttackModifiers, this.drawnAttackModifiers].forEach((attackModifiers) => {
        attackModifiers.forEach((attackModifier) => {
          alreadyInStack.add(attackModifier.id) 
          if (!eligible.has(attackModifier.id) && attackModifier.type != CharacterAttackModifierType.BLESS && attackModifier.type != CharacterAttackModifierType.CURSE) {
            this.removeAttackModifier(attackModifier)
          }
        })
      })      
      
      const toAdd = attackDeckManager.selectedAttackModifiers.filter((attackModifier) => !alreadyInStack.has(attackModifier.id))
      if (toAdd.length) {
        toAdd.forEach((attackModifier) => this.undrawnAttackModifiers.push(attackModifier))
        shuffle(this.undrawnAttackModifiers)
      }
    })
  }

  @action
  newGame() {
    this.recycleDeck()
    this.undrawnAttackModifiers = this.undrawnAttackModifiers.filter(attackModifier => {
      return attackModifier.type != CharacterAttackModifierType.BLESS && attackModifier.type != CharacterAttackModifierType.CURSE
    })
    this.turnInProgress = false
    this.shuffleOnEndOfTurn = false
  }

  @action
  drawNextAttackModifier() {

    this.turnInProgress = true

    if (!this.undrawnAttackModifiers.length) {
      this.recycleDeck()
    }

    if (!this.undrawnAttackModifiers.length) {
      // Deck is completely empty
      return
    }

    const drawnAttackModifier = this.undrawnAttackModifiers[0]
    this.removeAttackModifier(drawnAttackModifier)
    this.drawnAttackModifiers.unshift(drawnAttackModifier)
    
    console.log(drawnAttackModifier.type)
    if (drawnAttackModifier.type == CharacterAttackModifierType.CRIT || drawnAttackModifier.type == CharacterAttackModifierType.MISS) {
      this.shuffleOnEndOfTurn = true
    }

  }

  @action 
  endTurn() {
    if (!this.turnInProgress) {
      return
    }

    if (this.shuffleOnEndOfTurn) {
      this.recycleDeck()
    }

    this.shuffleOnEndOfTurn = false
    this.turnInProgress = false
  }

  @action
  private recycleDeck() {
    // DRAGONS: slice because we're removing in the loop
    this.drawnAttackModifiers.slice().forEach(attackModifier => {
      this.removeAttackModifier(attackModifier)
      if (attackModifier.type != CharacterAttackModifierType.BLESS && attackModifier.type != CharacterAttackModifierType.CURSE) {
        this.undrawnAttackModifiers.push(attackModifier)
      }
    })
    shuffle(this.undrawnAttackModifiers)
  }

  @action
  bless() {
    this.addTemporaryAttackModifier(this.characterManager.blessAttackModifiers)
  }

  @action
  curse() {
    this.addTemporaryAttackModifier(this.characterManager.curseAttackModifiers)
  }
  
  @action
  private addTemporaryAttackModifier(fromAttackModifiers: AttackModifier[]) {
    const toAdd = fromAttackModifiers.find(attackModifier => {
      return !this.drawnAttackModifiers.find((curAttackModifier) => attackModifier.id == curAttackModifier.id) &&
        !this.undrawnAttackModifiers.find((curAttackModifier) => attackModifier.id == curAttackModifier.id)
    })

    if (!toAdd) {
      // Out of curses/blesses
      return 
    }

    this.undrawnAttackModifiers.push(toAdd)
    shuffle(this.undrawnAttackModifiers)
  }

  @action
  private removeAttackModifier(cardToRemove: AttackModifier) {
    removeFromArray(this.undrawnAttackModifiers, cardToRemove)
    removeFromArray(this.drawnAttackModifiers, cardToRemove)
  }

}