
interface RawCharacterAbilityCard {
  image: string
}

interface RawAttackModifier {
  name: string
  image: string
}

interface RawAttackModifierAdditional {
  crit?: boolean
  miss?: boolean
  bless?: boolean
  curse?: boolean
  penalty?: boolean
}

interface RawAttackModifierAdditionalMap {
  [key: string]: RawAttackModifierAdditional
}

export interface CharacterAbilityCard {
  id: string
  image: string
  imageBasename: string
  character: Character
}

export enum CharacterAttackModifierType {
  CRIT = "CRIT",
  MISS = "MISS",
  BLESS = "BLESS",
  CURSE = "CURSE",
  PENALTY = "PENALTY"
}

export interface CharacterAttackModifier {
  id: string
  image: string
  imageBasename: string
  type: CharacterAttackModifierType | null
}

export interface Character {
  abbrev: string
}

export class GloomhavenDataService {

  characterAbilityCards: RawCharacterAbilityCard[]
  attackModifiers: RawAttackModifier[]
  attackModifierAdditionals: RawAttackModifierAdditionalMap

  constructor() {
    this.characterAbilityCards = require("json-loader!gloomhaven/data/character-ability-cards.js")
    this.attackModifiers = require("json-loader!gloomhaven/data/attack-modifiers.js")
    this.attackModifierAdditionals = require("../Data/attack-modifiers-additional.json")
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

  private _attackModifierFromRaw(rawAttackModifier: RawAttackModifier) : CharacterAttackModifier {
    const imageBasename = rawAttackModifier.image.slice("attack-modifiers/".length, -4)

    const additional = this.attackModifierAdditionals[rawAttackModifier.name]
    var type: CharacterAttackModifierType = null
    if (additional) {
      if (additional.crit) type = CharacterAttackModifierType.CRIT
      else if (additional.miss) type = CharacterAttackModifierType.MISS
      else if (additional.bless) type = CharacterAttackModifierType.BLESS
      else if (additional.curse) type = CharacterAttackModifierType.CURSE
      else if (additional.penalty) type = CharacterAttackModifierType.PENALTY
    }

    return {id: rawAttackModifier.name, image: rawAttackModifier.image, imageBasename: imageBasename, type: type}
  }

  private _attackModifiers(character?: Character) : CharacterAttackModifier[] {
    return this.attackModifiers
    .filter((attackModifier: RawAttackModifier) => {
      return (character && attackModifier.image.includes(`/${character.abbrev}/`)) ||
        attackModifier.image.includes(`/base/player/`) ||
        attackModifier.image.includes(`/base/player-mod/`)
    })
    .map((attackModifier: any) => this._attackModifierFromRaw(attackModifier))
  }

  attackModifiersForCharacter(character: Character) : CharacterAttackModifier[] {

    const attackModifiers = this._attackModifiers(character)
    .filter( attackModifier => attackModifier.type != CharacterAttackModifierType.BLESS && attackModifier.type != CharacterAttackModifierType.CURSE)      
    var soFar = new Set<string>()

    return attackModifiers.filter(attackModifier => {
      const dup = soFar.has(attackModifier.id)
      soFar.add(attackModifier.id)
      return !dup
    })

  }

  blessAttackModifiers() {
    return this._attackModifiers(null)
    .filter( attackModifier => attackModifier.type == CharacterAttackModifierType.BLESS)
  }

  curseAttackModifiers() {
    return this._attackModifiers(null)
    .filter( attackModifier => attackModifier.type == CharacterAttackModifierType.CURSE)
  }
}