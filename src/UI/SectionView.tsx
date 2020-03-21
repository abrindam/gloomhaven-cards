import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { SectionTitle, Section } from './SectionView.styles';
import { CardView } from './CardView';
import { Stack } from '../Logic/CardStackManager';
import { DropTarget, DropTargetSpec, DragElementWrapper } from 'react-dnd';
import { DragTypes } from './DragTypes';
import { Card } from '../Logic/Card';


const stackNames = {
  [Stack.HAND]: "Hand",
  [Stack.IN_PLAY]: "In Play",
  [Stack.ACTIVE]: "Active",
  [Stack.DISCARD]: "Discard",
  [Stack.LOST]: "Lost",
}

interface DropProps {
  dropRef: DragElementWrapper<any>
  isOver: boolean,
  canDrop: boolean
}

interface Props extends DropProps {
  container: Container
  stack: Stack
  horizontalCards: number, 
  verticalCards: number
  topPercent: number,
  leftPercent: number
}

@observer
class SectionView extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    render() {
      const cardsInStack = this.props.container.cardStackManager.getCardsForStack(this.props.stack)
      const idealCards = this.props.horizontalCards * this.props.verticalCards
      const overflowCards = Math.max(0, cardsInStack.length - idealCards)
      const overflowCorrection = overflowCards / (overflowCards + 1)
      console.log(overflowCorrection)
      return (
        <Section 
          ref={this.props.dropRef} 
          showValidDrop = {this.props.canDrop } 
          showValidDropHover = {this.props.canDrop && this.props.isOver} 
          {...this.props}
        >
          <SectionTitle>{stackNames[this.props.stack]}</SectionTitle>
            { 
              cardsInStack.map((card) => {
                let selectedId = this.props.container.selectedCardUIManager.selectedCard && this.props.container.selectedCardUIManager.selectedCard.id
                return (
                  <CardView 
                    key={card.id}
                    card={card} 
                    selected={ selectedId == card.id}
                    onClick = {()=> { this.cardSelected(card) }}
                    overflowCorrection = {overflowCorrection} 
                  />
                )
                  
              }) 
            }
        </Section>
      )
    }
 
    private cardSelected(card: Card) {
      this.props.container.selectedCardUIManager.selectCard(card)
    }
      
};

const dragSpec: DropTargetSpec<Props> = {
  drop: (props, monitor, component) => {
    if (monitor.getItemType() == DragTypes.CARD) {
      const cardToMove = monitor.getItem().card as Card
      props.container.cardStackManager.moveCard(cardToMove, props.stack)
    }
  },

  canDrop: (props, monitor) => {
    if (monitor.getItemType() == DragTypes.CARD) {
      const cardToMove = monitor.getItem().card as Card
      const cardStack = props.container.cardStackManager.getStackForCard(cardToMove)
      return cardStack != props.stack
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