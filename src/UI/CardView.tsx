import * as React from 'react';
import { observer } from "mobx-react";
import { DragSource, DragSourceSpec, DragElementWrapper, DragSourceOptions } from 'react-dnd'


import { CardAspectContainer, CardInnerContainer, CardMarker } from './CardView.styles';
import { DragTypes } from './DragTypes';
import { Card } from '../Logic/Card';
import { Logger } from '../Infra/Logger';

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
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  render() {

    return (
      <CardAspectContainer ref={this.props.dragRef} onClick={ this.onClick } overflowCorrection={this.props.overflowCorrection}>
        <CardInnerContainer card={this.props.card} selected={this.props.selected} ></CardInnerContainer>
        {this.props.card.markerLocation && <CardMarker location={this.props.card.markerLocation} onClick={ this.onMarkerClick } /> }
      </CardAspectContainer>
    )
  }

  private onClick(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (event.shiftKey) {
      var rect = (event.target as Element).getBoundingClientRect();
      var x = event.clientX - rect.left; //x position within the element.
      var y = event.clientY - rect.top;  //y position within the element.
      this.props.card.markerLocation = [x / rect.width, y / rect.height]
      Logger.log(`Set marker on ${this.props.card.id} at ${x}, ${y}`)
    }
    else {
      this.props.onClick()
    }
  }

  private onMarkerClick(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (event.shiftKey) {
      this.props.card.markerLocation = undefined
      Logger.log(`Removed marker on ${this.props.card.id}`)
    }
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