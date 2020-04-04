import * as React from 'react';
import { observer } from "mobx-react";

import { SectionTitle, Section, CardRow } from './SectionView.styles';
import { CardView } from './CardView';
import { Stack } from '../Logic/PlayingManager';
import { DropTarget, DropTargetSpec, DragElementWrapper } from 'react-dnd';
import { DragTypes } from './DragTypes';
import { Card } from '../Logic/Card';


export interface SectionViewDelegate {
  getCards(): Card[]
  canDropCard(card: Card): boolean
  onDropCard(card: Card): void
  isSelected(card: Card): boolean
  onSelected(card: Card): void
}

interface DropProps {
  dropRef: DragElementWrapper<any>
  isOver: boolean,
  canDrop: boolean
}

interface Props extends DropProps {
  name: string
  delegate: SectionViewDelegate
  horizontalCards: number, 
  verticalCards: number
}

@observer
class SectionView extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    render() {
  
      const cardsInStack = this.props.delegate.getCards()
      const idealCardsPerRow = this.props.horizontalCards
      const actualMinCardsPerRow = Math.floor(cardsInStack.length / this.props.verticalCards)
      const actualMaxCardsPerRow = Math.ceil(cardsInStack.length / this.props.verticalCards)
      const numberOfMaxRows = cardsInStack.length % this.props.verticalCards
      // I had to do ALGEBRA to figure this out!
      const overflowCorrection = Math.max(actualMaxCardsPerRow - idealCardsPerRow, 0) / (actualMaxCardsPerRow - 1)

      // Array of numbers, each entry is number of cards in a given row
      const rowLengths = Array(numberOfMaxRows).fill(actualMaxCardsPerRow).concat(Array(this.props.verticalCards - numberOfMaxRows).fill(actualMinCardsPerRow))
      let unrenderedCardsInStack = cardsInStack.slice()
      const rowCards = rowLengths.map((numCardsInRow) => {
        return unrenderedCardsInStack.splice(0, numCardsInRow)
      })


      return (
        <Section 
          ref={this.props.dropRef} 
          showValidDrop = {this.props.canDrop } 
          showValidDropHover = {this.props.canDrop && this.props.isOver} 
          horizontalCards = {this.props.horizontalCards}
          verticalCards = {this.props.verticalCards}
        >
          <SectionTitle>{this.props.name}</SectionTitle>
          {
            rowCards.map((cardsInRow, index) => {              
              return (
                <CardRow key={index}>
                  { 
                    cardsInRow.map((card) => {
                      return (
                        <CardView 
                          key={card.id}
                          card={card} 
                          selected={ this.props.delegate.isSelected(card) }
                          onClick = {()=> { this.cardSelected(card) }}
                          overflowCorrection = {overflowCorrection} 
                        />
                      )
                        
                    }) 
                  }
                </CardRow>
              )
            })
          }
        </Section>
      )
    }
 
    private cardSelected(card: Card) {
      this.props.delegate.onSelected(card)
    }
      
};

const dragSpec: DropTargetSpec<Props> = {
  drop: (props, monitor, component) => {
    if (monitor.getItemType() == DragTypes.CARD) {
      const droppedCard = monitor.getItem().card as Card
      props.delegate.onDropCard(droppedCard)
    }
  },

  canDrop: (props, monitor) => {
    if (monitor.getItemType() == DragTypes.CARD) {
      const hoveredCard = monitor.getItem().card as Card
      return props.delegate.canDropCard(hoveredCard)
    }
    return false
  }
  
}

let DroppingSectionView = DropTarget(DragTypes.CARD, dragSpec, (connect, monitor) => ({
  dropRef: connect.dropTarget(),
  isOver: !!monitor.isOver(),
  canDrop: !!monitor.canDrop()
}))(SectionView)

export { DroppingSectionView as SectionView }