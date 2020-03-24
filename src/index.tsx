import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from './Container';
import { AppView } from './UI/AppView';
import { Stack } from './Logic/CardStackManager';
import { Card } from './Logic/Card';

const container = new Container()

;(window as any).container = container


require("gloomhaven/data/character-ability-cards")


container.deckManager.selectedCards.push(new Card("beacon-of-light"))
container.deckManager.selectedCards.push(new Card("cleansing-force"))
container.deckManager.selectedCards.push(new Card("defensive-stance"))
container.deckManager.selectedCards.push(new Card("illuminate-the-target"))
container.deckManager.selectedCards.push(new Card("mobilizing-axiom"))
container.deckManager.selectedCards.push(new Card("path-of-glory"))
container.deckManager.selectedCards.push(new Card("practical-plans"))
container.deckManager.selectedCards.push(new Card("purifying-aura"))
container.deckManager.selectedCards.push(new Card("tactical-order"))
container.deckManager.selectedCards.push(new Card("unwavering-mandate"))
container.deckManager.selectedCards.push(new Card("weapon-of-purity"))

ReactDOM.render(<AppView container={container} />, document.getElementById('root'));


