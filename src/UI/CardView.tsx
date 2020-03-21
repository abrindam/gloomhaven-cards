import * as React from 'react';
import { observer } from "mobx-react";
import { DragSource, DragSourceSpec, DragElementWrapper, DragSourceOptions } from 'react-dnd'


import { CardAspectContainer, CardInnerContainer } from './CardView.styles';
import { DragTypes } from './DragTypes';
import { Card } from '../Logic/Card';

interface DragProps {
  dragRef: DragElementWrapper<DragSourceOptions>
  isDragging: boolean
}

interface Props extends DragProps {card: Card, selected: boolean, onClick: () => void, overflowCorrection: number}

@observer
class CardView extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  render() {

    return (
      <CardAspectContainer ref={this.props.dragRef} onClick={ this.onClick } overflowCorrection={this.props.overflowCorrection}>
        <CardInnerContainer id={this.props.card.id} selected={this.props.selected} ></CardInnerContainer>
      </CardAspectContainer>
    )
  }

  private onClick(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onClick()
  }
}


const dragSpec: DragSourceSpec<Props, unknown> = {
  beginDrag: (props: Props) => ({
    card: props.card
  }),
}

let DraggingCardView = DragSource(DragTypes.CARD, dragSpec, (connect, monitor) => ({
  dragRef: connect.dragSource(),
  isDragging: !!monitor.isDragging(),
}))(CardView)

export { DraggingCardView as CardView }