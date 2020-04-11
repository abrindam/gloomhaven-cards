
interface RawCharacterAbilityCard {
  image: string
}

export interface CharacterAbilityCard {
  id: string
  image: string
  imageBasename: string
  character: Character
}

export interface Character {
  abbrev: string
}

export class GloomhavenDataService {

  characterAbilityCards: RawCharacterAbilityCard[]

  constructor() {
    this.characterAbilityCards = require("json-loader!gloomhaven/data/character-ability-cards.js")
  }

  private _cardFromRaw(rawCard: RawCharacterAbilityCard) : CharacterAbilityCard {
    const cardPathParts = rawCard.image.split('/')
    const cardImageBasename = cardPathParts[cardPathParts.length -  1].split('.')[0]
    const characterAbbrev = cardPathParts[cardPathParts.length -  2]

    return {id: cardImageBasename, image: rawCard.image, imageBasename: cardImageBasename, character: {abbrev: characterAbbrev}}
  }

  private _cardsForCharacter(character: Character) : CharacterAbilityCard[] {
    const cards = this.characterAbilityCards
      .map((card: any) => this._cardFromRaw(card))
      .filter((card: CharacterAbilityCard) => card.character.abbrev == character.abbrev)

    var soFar = new Set<string>()

    return cards.filter(card => {
      const dup = soFar.has(card.id)
      soFar.add(card.id)
      return !dup
    })
      
  }

  cardsForCharacter(character: Character) : CharacterAbilityCard[] {
    return this._cardsForCharacter(character)
      .filter((card: any) => !card.image.endsWith("-back.png"))
  }

  backCardForCharacter(character: Character) : CharacterAbilityCard {
  
    return this._cardsForCharacter(character)
      .filter((card: any) => card.image.endsWith("-back.png"))
      [0]
  }

  cardsForId(id: string) : CharacterAbilityCard[] {
    return this.characterAbilityCards
      .map((card: any) => this._cardFromRaw(card))
      .filter((card: CharacterAbilityCard) => card.id == id)
  }

  allCharacters() : Character[] {
    var characters: Character[] = []
    const allCards = this.characterAbilityCards
      .map((card: any) => this._cardFromRaw(card))

    allCards.forEach((card) => {
      if (!characters.find((character) => character.abbrev == card.character.abbrev)) {
        characters.push(card.character)
      }
    })

    return characters
  }
}