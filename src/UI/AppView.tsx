import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { App } from './AppView.styles';
import { DndProvider } from 'react-dnd';
import DndBackend from 'react-dnd-html5-backend'
import { PlayingView } from './PlayingView';

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
                <PlayingView container={this.props.container} />                  
              </DndProvider>
            </App>
        );
     }
};