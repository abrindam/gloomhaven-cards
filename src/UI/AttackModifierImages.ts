import { AttackModifier } from "../Logic/AttackModifier";


export class AttackModifierImages {
  static get(attackModifier: AttackModifier) : string {
    return require(`gloomhaven/images/attack-modifiers/${attackModifier.imageBasename}.png`).default
  }
}