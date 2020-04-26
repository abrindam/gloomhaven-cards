import { observer } from "mobx-react";
import * as React from 'react';
import { Container } from '../Container';
import { AttackDeckViewContainer, AttackModifierAspectContainer, AttackModifierBackInnerContainer, AttackModifierInnerContainer, DrawnModifiers, UndrawnModifiers, NumberOfCardsAnnotation, Controls } from './AttackDeckView.styles';
import { Button } from "./CommonUI.styles";



interface Props { container: Container}

@observer
export class AttackDeckView extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    
    this.onClickDraw = this.onClickDraw.bind(this)
    this.onClickEndTurn = this.onClickEndTurn.bind(this)
    this.onClickBless = this.onClickBless.bind(this)
    this.onClickCurse = this.onClickCurse.bind(this)
  }

  render() {

    const drawnAttackModifiers = this.props.container.playingAttackDeckManager.drawnAttackModifiers
    const undrawnAttackModifiers = this.props.container.playingAttackDeckManager.undrawnAttackModifiers
    const turnInProgress = this.props.container.playingAttackDeckManager.turnInProgress

    const drawnCardsToDisplay = drawnAttackModifiers.slice(0, 4).reverse();

    const drawnCards = drawnCardsToDisplay.map(attackModifier => {
      return (
        <AttackModifierAspectContainer key={attackModifier.id} overflowCorrection={0.66}>
          <AttackModifierInnerContainer attackModifier={attackModifier}/>
        </AttackModifierAspectContainer>
      )
    })

    const numberOfBlesses = this.props.container.playingAttackDeckManager.blessesInDeck
    const numberOfCurses = this.props.container.playingAttackDeckManager.cursesInDeck

    return (
      <AttackDeckViewContainer>
        <DrawnModifiers>
          
            { drawnCards }
        </DrawnModifiers>
        <UndrawnModifiers>
        <AttackModifierAspectContainer overflowCorrection={0}>
            <AttackModifierBackInnerContainer onClick={this.onClickDraw}/>
            <NumberOfCardsAnnotation>{ undrawnAttackModifiers.length }</NumberOfCardsAnnotation>              
          </AttackModifierAspectContainer>
       
        
          <Controls>
            {
              turnInProgress ? (
                <Button onClick={this.onClickEndTurn}>End Turn</Button>
              ) : ( 
                <React.Fragment>
                  <Button onClick={this.onClickBless}>Bless ({numberOfBlesses})</Button>
                  <Button onClick={this.onClickCurse}>Curse ({numberOfCurses})</Button>
                </React.Fragment>
              )
            }
            
          </Controls>
          </UndrawnModifiers>

        
        
      </AttackDeckViewContainer>
    )
    
  }

  onClickDraw() {
    this.props.container.playingAttackDeckManager.drawNextAttackModifier()
  }

  onClickEndTurn() {
    this.props.container.playingAttackDeckManager.endTurn()
  }

  onClickBless() {
    this.props.container.playingAttackDeckManager.bless()
  }

  onClickCurse() {
    this.props.container.playingAttackDeckManager.curse()
  }
}
