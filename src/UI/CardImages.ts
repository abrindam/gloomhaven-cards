import { Card } from "../Logic/Card";


export class CardImages {
  static get(card: Card) : string {
    try {
      return require(`gloomhaven/images/character-ability-cards/${card.character.abbrev}/${card.imageBasename}.png`).default
    } catch(e) {
      return require(`jotl/images/character-ability-cards/${card.character.abbrev}/${card.imageBasename}.png`).default
    }
    
  }
}