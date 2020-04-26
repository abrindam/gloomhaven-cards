import { observable, computed } from "mobx";
import { Character, GloomhavenDataService } from "./GloomhavenDataService";
import { Card } from "./Card";
import { object, serializable, custom } from "serializr";
import { setupPersistence } from "./Persistence";
import { AttackModifier } from "./AttackModifier";

export class CharacterManager {

  private gloomhavenDataService: GloomhavenDataService;

  @serializable(custom((val) => val, (val) => val))
  @observable
  character: Character

  allCharacters: Character[]
  
  

  constructor(gloomhavenDataService: GloomhavenDataService) {
    this.gloomhavenDataService = gloomhavenDataService
    
    this.allCharacters = this.gloomhavenDataService.allCharacters()
    this.character = {abbrev: "MT"}

    setupPersistence(this, "character")
  }

  @computed get characterCards() : Card[] {
    return this.gloomhavenDataService.cardsForCharacter(this.character)
      .map(card => new Card(card.id, card.imageBasename, card.character))
  }

  @computed get characterAttackModifiers() : AttackModifier[] {
    return this.gloomhavenDataService.attackModifiersForCharacter(this.character)
      .map(attackModifier => new AttackModifier(attackModifier.id, attackModifier.imageBasename, attackModifier.type))
  }

  @computed get blessAttackModifiers() : AttackModifier[] {
    return this.gloomhavenDataService.blessAttackModifiers()
    .map(attackModifier => new AttackModifier(attackModifier.id, attackModifier.imageBasename, attackModifier.type))
  }

  @computed get curseAttackModifiers() : AttackModifier[] {
    return this.gloomhavenDataService.curseAttackModifiers()
    .map(attackModifier => new AttackModifier(attackModifier.id, attackModifier.imageBasename, attackModifier.type))
  }
}