import { observable, computed } from "mobx";
import { Character, GloomhavenDataService } from "./GloomhavenDataService";
import { Card } from "./Card";
import { object, serializable, custom } from "serializr";
import { setupPersistence } from "./Persistence";

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


}