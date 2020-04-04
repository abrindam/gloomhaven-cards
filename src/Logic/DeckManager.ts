import { Card } from "./Card";
import { computed, action, observable, autorun } from "mobx";
import { setupPersistence } from "./Persistence";
import { serializable, list, object, serialize } from "serializr"


export class DeckManager {

  
  @observable
  unselectedCards: Card[] = []

  @serializable(list(object(Card)))
  @observable
  selectedCards: Card[] = []

  constructor() {
    this.unselectedCards.push(new Card("angelic-ascension"))
    this.unselectedCards.push(new Card("beacon-of-light"))
    this.unselectedCards.push(new Card("bright-aegis"))
    this.unselectedCards.push(new Card("brilliant-prayer"))
    this.unselectedCards.push(new Card("burning-flash"))
    this.unselectedCards.push(new Card("cautious-advance"))
    this.unselectedCards.push(new Card("cleansing-force"))
    this.unselectedCards.push(new Card("daybreak"))
    this.unselectedCards.push(new Card("dazzling-charge"))
    this.unselectedCards.push(new Card("defensive-stance"))
    this.unselectedCards.push(new Card("divine-intervention"))
    this.unselectedCards.push(new Card("empowering-command"))
    this.unselectedCards.push(new Card("engulfing-radiance"))
    this.unselectedCards.push(new Card("glorious-bolt"))
    this.unselectedCards.push(new Card("hammer-blow"))
    this.unselectedCards.push(new Card("holy-strike"))
    this.unselectedCards.push(new Card("illuminate-the-target"))
    this.unselectedCards.push(new Card("inspiring-sanctity"))
    this.unselectedCards.push(new Card("lay-on-hands"))
    this.unselectedCards.push(new Card("mobilizing-axiom"))
    this.unselectedCards.push(new Card("path-of-glory"))
    this.unselectedCards.push(new Card("practical-plans"))
    this.unselectedCards.push(new Card("protective-blessing"))
    this.unselectedCards.push(new Card("purifying-aura"))
    this.unselectedCards.push(new Card("righteous-strength"))
    this.unselectedCards.push(new Card("scales-of-justice"))
    // this.unselectedCards.push(new Card("sk-back"))
    this.unselectedCards.push(new Card("supportive-chant"))
    this.unselectedCards.push(new Card("tactical-order"))
    this.unselectedCards.push(new Card("unwavering-mandate"))
    this.unselectedCards.push(new Card("weapon-of-purity"))

    setupPersistence(this, "deck")

    this.unselectedCards = this.unselectedCards.filter((card) => {
      return !this.selectedCards.find((curCard) => card.id == curCard.id)
    })
  }
  
  @action
  selectCard(card: Card) {
    this.swapCard(card, this.unselectedCards, this.selectedCards)
  }

  @action
  unselectCard(card: Card) {
    this.swapCard(card, this.selectedCards, this.unselectedCards)
  }

  private swapCard(card: Card, from: Card[], to: Card[]) {
    let index = from.findIndex((curCard) => card.id == curCard.id)
    if (index == -1) {
      return
    }

    from.splice(index, 1)
    to.push(card)
  }

}