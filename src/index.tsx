import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from './Container';
import { AppView } from './UI/AppView';
import { Card } from './Logic/Card';

const container = new Container()

;(window as any).container = container


require("gloomhaven/data/character-ability-cards")


container.deckManager.unselectedCards.push(new Card("angelic-ascension"))
container.deckManager.unselectedCards.push(new Card("beacon-of-light"))
container.deckManager.unselectedCards.push(new Card("bright-aegis"))
container.deckManager.unselectedCards.push(new Card("brilliant-prayer"))
container.deckManager.unselectedCards.push(new Card("burning-flash"))
container.deckManager.unselectedCards.push(new Card("cautious-advance"))
container.deckManager.unselectedCards.push(new Card("cleansing-force"))
container.deckManager.unselectedCards.push(new Card("daybreak"))
container.deckManager.unselectedCards.push(new Card("dazzling-charge"))
container.deckManager.unselectedCards.push(new Card("defensive-stance"))
container.deckManager.unselectedCards.push(new Card("divine-intervention"))
container.deckManager.unselectedCards.push(new Card("empowering-command"))
container.deckManager.unselectedCards.push(new Card("engulfing-radiance"))
container.deckManager.unselectedCards.push(new Card("glorious-bolt"))
container.deckManager.unselectedCards.push(new Card("hammer-blow"))
container.deckManager.unselectedCards.push(new Card("holy-strike"))
container.deckManager.unselectedCards.push(new Card("illuminate-the-target"))
container.deckManager.unselectedCards.push(new Card("inspiring-sanctity"))
container.deckManager.unselectedCards.push(new Card("lay-on-hands"))
container.deckManager.unselectedCards.push(new Card("mobilizing-axiom"))
container.deckManager.unselectedCards.push(new Card("path-of-glory"))
container.deckManager.unselectedCards.push(new Card("practical-plans"))
container.deckManager.unselectedCards.push(new Card("protective-blessing"))
container.deckManager.unselectedCards.push(new Card("purifying-aura"))
container.deckManager.unselectedCards.push(new Card("righteous-strength"))
container.deckManager.unselectedCards.push(new Card("scales-of-justice"))
// container.deckManager.unselectedCards.push(new Card("sk-back"))
container.deckManager.unselectedCards.push(new Card("supportive-chant"))
container.deckManager.unselectedCards.push(new Card("tactical-order"))
container.deckManager.unselectedCards.push(new Card("unwavering-mandate"))
container.deckManager.unselectedCards.push(new Card("weapon-of-purity"))

ReactDOM.render(<AppView container={container} />, document.getElementById('root'));


