import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { App } from './AppView.styles';
import { DndProvider } from 'react-dnd';
import DndBackend from 'react-dnd-html5-backend'
import { PlayingView } from './PlayingView';
import { ChooseDeckView } from './ChooseDeckView';
import { SetupState } from '../Logic/SetupStateUIManager';

interface Props {container: Container}

@observer
export class AppView extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <App>
              <DndProvider backend={DndBackend}>
                { 
                  this.props.container.setupStateUIManager.setupState == SetupState.CHOOSE_DECK ?
                  <ChooseDeckView container={this.props.container} /> :
                  <PlayingView container={this.props.container} />   
                }
              </DndProvider>
            </App>
        );
     }
};