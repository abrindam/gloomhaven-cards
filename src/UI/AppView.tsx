import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { App } from './AppView.styles';
import { DndProvider } from 'react-dnd';
import DndBackend from 'react-dnd-html5-backend'
import { PlayingView } from './PlayingView';
import { ChooseDeckView } from './ChooseDeckView';
import { SetupState } from '../Logic/SetupStateUIManager';
import { ChooseCharacterView } from './ChooseCharacterView';

interface Props {container: Container}

@observer
export class AppView extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    viewToShow() {
      switch(this.props.container.setupStateUIManager.setupState) {
        case SetupState.CHOOSE_CHARACTER:
          return <ChooseCharacterView container={this.props.container} />
        case SetupState.CHOOSE_DECK:
          return <ChooseDeckView container={this.props.container} />
        case SetupState.PLAYING:
          return <PlayingView container={this.props.container} />
      } 
    }

    render() {
        return (
            <App>
              <DndProvider backend={DndBackend}>
                { this.viewToShow() }
              </DndProvider>
            </App>
        );
     }
};