import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from './Container';
import { AppView } from './UI/AppView';
import { Card } from './Logic/Card';

const container = new Container()

;(window as any).container = container


require("gloomhaven/data/character-ability-cards")


ReactDOM.render(<AppView container={container} />, document.getElementById('root'));


