import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { App, AppInner, Row } from './AppView.styles';
import { Stack } from '../Logic/CardStackManager';
import { SectionView } from './SectionView';
import { DndProvider } from 'react-dnd';
import DndBackend from 'react-dnd-html5-backend'

interface Props {container: Container}

@observer
export class AppView extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <App>
              <AppInner>
              <DndProvider backend={DndBackend}>
                <Row>
                  <SectionView 
                    container={this.props.container}
                    stack={Stack.IN_PLAY}  
                    horizontalCards={2} 
                    verticalCards={1}
                    topPercent={0}
                    leftPercent={0}
                  />
                  <SectionView 
                    container={this.props.container}
                    stack={Stack.ACTIVE}  
                    horizontalCards={2} 
                    verticalCards={1}
                    topPercent={0}
                    leftPercent={25}
                  />
                  <SectionView 
                    container={this.props.container}
                    stack={Stack.DISCARD}  
                    horizontalCards={2} 
                    verticalCards={1}
                    topPercent={0}
                    leftPercent={50}
                  />
                  <SectionView 
                    container={this.props.container}
                    stack={Stack.LOST}  
                    horizontalCards={2} 
                    verticalCards={1}
                    topPercent={0}
                    leftPercent={75}
                  />
                </Row>
                  <SectionView 
                    container={this.props.container}
                    stack={Stack.HAND}  
                    horizontalCards={6} 
                    verticalCards={2}
                    topPercent={35}
                    leftPercent={0}
                  />
                  
              </DndProvider>
              </AppInner>
            </App>
        );
     }
};