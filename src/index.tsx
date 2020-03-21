import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from './Container';
import { AppView } from './UI/AppView';
import { Stack } from './Logic/CardStackManager';
import { Card } from './Logic/Card';

const container = new Container()

;(window as any).container = container

container.cardStackManager.moveCard(new Card("beacon-of-light"), Stack.HAND)
container.cardStackManager.moveCard(new Card("cleansing-force"), Stack.HAND)
container.cardStackManager.moveCard(new Card("defensive-stance"), Stack.HAND)
container.cardStackManager.moveCard(new Card("illuminate-the-target"), Stack.HAND)
container.cardStackManager.moveCard(new Card("mobilizing-axiom"), Stack.HAND)
container.cardStackManager.moveCard(new Card("path-of-glory"), Stack.HAND)
container.cardStackManager.moveCard(new Card("practical-plans"), Stack.HAND)
container.cardStackManager.moveCard(new Card("purifying-aura"), Stack.HAND)
container.cardStackManager.moveCard(new Card("tactical-order"), Stack.HAND)
container.cardStackManager.moveCard(new Card("unwavering-mandate"), Stack.HAND)
container.cardStackManager.moveCard(new Card("weapon-of-purity"), Stack.HAND)

ReactDOM.render(<AppView container={container} />, document.getElementById('root'));


