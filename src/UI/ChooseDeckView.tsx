import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { Stack } from '../Logic/PlayingManager';
import { SectionView, SectionViewDelegate } from './SectionView';
import { Card } from '../Logic/Card';
import { Controls } from './ChooseDeckView.styles';
import { Button } from './CommonUI.styles';

class ChooseDeckSectionViewDelegate implements SectionViewDelegate {
  private container: Container;
  private selected: boolean;
  
  constructor(container: Container, selected: boolean) {
    this.container = container
    this.selected = selected
  }

  getCards(): Card[] {
    if (this.selected) {
      return this.container.deckManager.selectedCards
    } else {
      return this.container.deckManager.unselectedCards
    }
  }
  canDropCard(card: Card): boolean {
    if (this.selected) {
      return this.container.deckManager.selectedCards.findIndex((curCard) => curCard.id == card.id) == -1
    } else {
      return this.container.deckManager.unselectedCards.findIndex((curCard) => curCard.id == card.id) == -1
    }
  }
  onDropCard(card: Card): void {
    if (this.selected) {
      this.container.deckManager.selectCard(card)
    } else {
      this.container.deckManager.unselectCard(card)
    }
  }
  isSelected(card: Card): boolean {
    // let selectedId = this.container.selectedCardUIManager.selectedCard && this.container.selectedCardUIManager.selectedCard.id
    // return selectedId == card.id
    return false
  }
  onSelected(card: Card): void {
    // this.container.selectedCardUIManager.selectCard(card)
  }
}

interface Props {container: Container}

@observer
export class ChooseDeckView extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
    this.onClickContinue = this.onClickContinue.bind(this)
  }

  render() {

    const numUnselectedCards = this.props.container.deckManager.unselectedCards.length
    const numSelectedCards = this.props.container.deckManager.selectedCards.length
    
    const numSelectedColumns = Math.max(2, Math.ceil((numSelectedCards) / 3))
    const numUnselectedColumns = 8 - numSelectedColumns

    return (
      <div>
          <div>
            <SectionView
              name="Unselected" 
              delegate={new ChooseDeckSectionViewDelegate(this.props.container, false)}
              horizontalCards={numUnselectedColumns} 
              verticalCards={3}
            />
            <SectionView
              name="Selected" 
              delegate={new ChooseDeckSectionViewDelegate(this.props.container, true)}
              horizontalCards={numSelectedColumns} 
              verticalCards={3}
            />
          </div>
          <Controls>
            <Button onClick={this.onClickContinue}>Continue</Button>
          </Controls>
      </div>
    )
  }

  onClickContinue() {
    this.props.container.setupStateUIManager.chooseDeckDone()
  }
}