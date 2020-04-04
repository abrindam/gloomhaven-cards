import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { Row, NonCardSection, NonCardSectionTitle, VerticalGroup, Controls } from './PlayingView.styles';
import { Stack } from '../Logic/PlayingManager';
import { SectionView, SectionViewDelegate } from './SectionView';
import { Card } from '../Logic/Card';
import { Button } from './CommonUI.styles';

class PlayingViewSectionViewDelegate implements SectionViewDelegate {
  private container: Container;
  private stack: Stack;
  
  constructor(container: Container, stack: Stack) {
    this.container = container
    this.stack = stack
  }

  getCards(): Card[] {
    return this.container.playingManager.getCardsForStack(this.stack)
  }
  canDropCard(card: Card): boolean {
    const cardStack = this.container.playingManager.getStackForCard(card)
    return cardStack != this.stack
  }
  onDropCard(card: Card): void {
    this.container.playingManager.moveCard(card, this.stack)
  }
  isSelected(card: Card): boolean {
    let selectedId = this.container.selectedCardUIManager.selectedCard && this.container.selectedCardUIManager.selectedCard.id
    return selectedId == card.id
  }
  onSelected(card: Card): void {
    this.container.selectedCardUIManager.selectCard(card)
  }
}

interface Props {container: Container}

@observer
export class PlayingView extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
    this.onClickChangeDeck = this.onClickChangeDeck.bind(this)
  }

  render() {
    return (
      <div>
        <Row>
          <SectionView
            name="In Play" 
            delegate={new PlayingViewSectionViewDelegate(this.props.container, Stack.IN_PLAY)}
            horizontalCards={2} 
            verticalCards={1}
          />
          <SectionView
            name="Active" 
            delegate={new PlayingViewSectionViewDelegate(this.props.container, Stack.ACTIVE)}
            horizontalCards={2} 
            verticalCards={1}
          />
          <SectionView
            name="Discard" 
            delegate={new PlayingViewSectionViewDelegate(this.props.container, Stack.DISCARD)}
            horizontalCards={2} 
            verticalCards={1}
          />
          <SectionView
            name="Lost" 
            delegate={new PlayingViewSectionViewDelegate(this.props.container, Stack.LOST)}
            horizontalCards={2} 
            verticalCards={1}
          />
        </Row>
        <Row>
          <SectionView
            name="Hand" 
            delegate={new PlayingViewSectionViewDelegate(this.props.container, Stack.HAND)}
            horizontalCards={6} 
            verticalCards={2}
          />
          <VerticalGroup horizontalCards={2} verticalCards={2}>
          <NonCardSection 
            horizontalCards={2} 
            verticalCards={1}
          >
            <NonCardSectionTitle>Attack Deck</NonCardSectionTitle>
          </NonCardSection>
          <Controls>
            <Button onClick={this.onClickChangeDeck}>Change Deck</Button>
          </Controls>
          </VerticalGroup>
        </Row>
      </div>
    )
  }

  onClickChangeDeck() {
    this.props.container.setupStateUIManager.changeDeck()
  }
}