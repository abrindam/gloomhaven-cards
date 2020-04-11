import { Card } from "../Logic/Card";


export class CardImages {
  static get(card: Card) : string {
    return require(`gloomhaven/images/character-ability-cards/${card.character.abbrev}/${card.imageBasename}.png`).default
  }
}