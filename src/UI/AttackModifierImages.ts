import { AttackModifier } from "../Logic/AttackModifier";


export class AttackModifierImages {
  static get(attackModifier: AttackModifier) : string {
    try {
      return require(`gloomhaven/images/attack-modifiers/${attackModifier.imageBasename}.png`).default
    } catch(e) {
      return require(`jotl/images/attack-modifiers/${attackModifier.imageBasename}.png`).default
    }
    
  }
}