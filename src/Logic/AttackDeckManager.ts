import { computed, action, observable, autorun } from "mobx";
import { setupPersistence } from "./Persistence";
import { serializable, list, object, serialize } from "serializr"
import { CharacterManager } from "./CharacterManager";
import { AttackModifier } from "./AttackModifier";

function removeFromArray(array:AttackModifier[], item: AttackModifier) {
  const index = array.findIndex(curItem => curItem.id == item.id)
  index >= 0 && array.splice(index, 1)
}

export class AttackDeckManager {

  
  @observable
  unselectedAttackModifiers: AttackModifier[] = []

  @serializable(list(object(AttackModifier)))
  @observable
  selectedAttackModifiers: AttackModifier[] = []

  constructor(characterManager: CharacterManager) {
    
    setupPersistence(this, "attackDeck")

    this.unselectedAttackModifiers = this.unselectedAttackModifiers.filter((attackModifier) => {
      return !this.selectedAttackModifiers.find((curAttackModifier) => attackModifier.id == curAttackModifier.id)
    })

    autorun(() => {
      const eligible = new Set<String>()
      characterManager.characterAttackModifiers.forEach((attackModifier) => eligible.add(attackModifier.id))

      const alreadyInStack = new Set<String>()
      ;[this.unselectedAttackModifiers, this.selectedAttackModifiers].forEach((attackModifiers) => {
        attackModifiers.forEach((attackModifier) => {
          alreadyInStack.add(attackModifier.id) 
          if (!eligible.has(attackModifier.id)) {
            this.removeAttackModifier(attackModifier)
          }
        })
      })      
      
      const toAdd = characterManager.characterAttackModifiers.filter((attackModifier) => !alreadyInStack.has(attackModifier.id))
      toAdd.forEach((attackModifier) => this.addAttackModifier(attackModifier, this.unselectedAttackModifiers))
    })
  }
  
  @action
  selectAttackModifier(attackModifier: AttackModifier) {
    this.swapAttackModifier(attackModifier, this.unselectedAttackModifiers, this.selectedAttackModifiers)
  }

  @action
  unselectAttackModifier(attackModifier: AttackModifier) {
    this.swapAttackModifier(attackModifier, this.selectedAttackModifiers, this.unselectedAttackModifiers)
  }


  @action
  private addAttackModifier(attackModifier: AttackModifier, to: AttackModifier[]) {
    to.push(attackModifier)
  }

  @action
  private removeAttackModifier(attackModifierToRemove: AttackModifier) {
    removeFromArray(this.unselectedAttackModifiers, attackModifierToRemove)
    removeFromArray(this.selectedAttackModifiers, attackModifierToRemove)
  }

  private swapAttackModifier(attackModifier: AttackModifier, from: AttackModifier[], to: AttackModifier[]) {
    let index = from.findIndex((curAttackModifier) => attackModifier.id == curAttackModifier.id)
    if (index == -1) {
      return
    }

    from.splice(index, 1)
    to.push(attackModifier)
  }

}