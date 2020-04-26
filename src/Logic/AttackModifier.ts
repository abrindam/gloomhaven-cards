import { serializable, object, primitive, custom } from "serializr"
import { CharacterAttackModifierType } from "./GloomhavenDataService"

export class AttackModifier {

  @serializable
  readonly id: string

  @serializable
  readonly imageBasename: string

  @serializable
  readonly type: CharacterAttackModifierType

  constructor(id: string, imageBasename: string, type: CharacterAttackModifierType) {
    this.id = id
    this.imageBasename = imageBasename
    this.type = type
  }

}