import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { Row, NonCardSection, NonCardSectionTitle, VerticalGroup, Controls } from './PlayingView.styles';
import { Stack } from '../Logic/PlayingManager';
import { SectionView, SectionViewDelegate } from './SectionView';
import { Card } from '../Logic/Card';
import { Button } from './CommonUI.styles';
import { AttackDeckView } from './AttackDeckView';
import { Logger } from '../Infra/Logger';

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
    Logger.log(`Dragged card ${card.id} to stack ${this.stack}`)
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
    this.keyListener = this.keyListener.bind(this)
    this.onClickChangeDeck = this.onClickChangeDeck.bind(this)
    this.onClickChangeAttackDeck = this.onClickChangeAttackDeck.bind(this)
    this.onClickNewGame = this.onClickNewGame.bind(this)
    this.onClickInPlayActionSwapOrder = this.onClickInPlayActionSwapOrder.bind(this)
    this.onClickDiscardActionRandomCard = this.onClickDiscardActionRandomCard.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyListener)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyListener)
  }

  keyListener(event: KeyboardEvent) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") this.onKeyDownArrowLeft()
    else if (event.code === "ArrowRight" || event.code === "KeyD") this.onKeyDownArrowRight()
    else if (event.code === "Escape") this.onKeyDownEscape()
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
            actionButtonLabel="Swap Order"
            onActionButtonClick={this.onClickInPlayActionSwapOrder}
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
            actionButtonLabel="Random Card"
            onActionButtonClick={this.onClickDiscardActionRandomCard}
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
            <AttackDeckView container = {this.props.container} />
          </NonCardSection>
          <Controls>
            <Button onClick={this.onClickChangeDeck}>Change Deck</Button>
            <Button onClick={this.onClickChangeAttackDeck}>Change Attack Deck</Button>
            <Button onClick={this.onClickNewGame}>New Game</Button>
          </Controls>
          </VerticalGroup>
        </Row>
      </div>
    )
  }

  onClickChangeDeck() {
    this.props.container.setupStateUIManager.changeDeck()
  }

  onClickChangeAttackDeck() {
    this.props.container.setupStateUIManager.changeAttackDeck()
  }

  onClickNewGame() {
    const ok = confirm("Are you sure you want to start a new game?")
    if (ok) {
      this.props.container.playingManager.newGame()
      this.props.container.playingAttackDeckManager.newGame()
      Logger.log("New game")
    }
  }

  onClickInPlayActionSwapOrder() {
    this.props.container.playingManager.swapInPlayOrder()
    Logger.log("Swap in play order")
  }

  onClickDiscardActionRandomCard() {
    const selected = this.props.container.playingManager.randomDiscardCard()
    this.props.container.selectedCardUIManager.selectCard(selected)
    Logger.log(`Selected random card ${selected.id}`)
  }

  onKeyDownArrowLeft() {
    const selectedCard = this.props.container.selectedCardUIManager.selectedCard
    if (!selectedCard) return
    const currentIndex = this.props.container.playingManager.getIndexInStackForCard(selectedCard)
    this.props.container.playingManager.setIndexInStackForCard(selectedCard, Math.max(0, currentIndex - 1))
  }

  onKeyDownArrowRight() {
    const selectedCard = this.props.container.selectedCardUIManager.selectedCard
    if (!selectedCard) return
    const currentIndex = this.props.container.playingManager.getIndexInStackForCard(selectedCard)
    const maxIndex = this.props.container.playingManager.getStackLengthForCard(selectedCard) - 1
    this.props.container.playingManager.setIndexInStackForCard(selectedCard, Math.min(maxIndex, currentIndex + 1))
  }

  onKeyDownEscape() {
    this.props.container.selectedCardUIManager.selectCard(null)
  }

}