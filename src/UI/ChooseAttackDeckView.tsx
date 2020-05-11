import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { Controls, Title, BottomBar, Status, AttackModifierList, AttackModifierAspectContainer, AttackModifierInnerContainer, AttackModifierBorder } from './ChooseAttackDeckView.styles';
import { Button } from './CommonUI.styles';
import { AttackModifier } from '../Logic/AttackModifier';
import { CharacterAttackModifierType } from '../Logic/GloomhavenDataService';
import { Logger } from '../Infra/Logger';

interface Props {container: Container}

@observer
export class ChooseAttackDeckView extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
    this.onClickAttackModifier = this.onClickAttackModifier.bind(this)
    this.onClickChangeCharacter = this.onClickChangeCharacter.bind(this)
    this.onClickChangeDeck = this.onClickChangeDeck.bind(this)
    this.onClickPlay = this.onClickPlay.bind(this)
  }

  isAttackModifierSelected(attackModifier: AttackModifier) {
    return !!this.props.container.attackDeckManager.selectedAttackModifiers.find(curAttackModifier => attackModifier.id == curAttackModifier.id)
  }

  render() {

    const numSelectedCards = this.props.container.deckManager.selectedCards.length
    
    const numSelectedColumns = Math.max(2, Math.ceil((numSelectedCards) / 3))

    var penaltyAttackModifiersSoFar = 0

    // TODO sort-of-hack: show no more than 6 penalty "-1" cards so as to not take up too much space
    const attackModifiersToShow = this.props.container.characterManager.characterAttackModifiers.filter( attackModifier => {
      if (attackModifier.type == CharacterAttackModifierType.PENALTY) {
        penaltyAttackModifiersSoFar ++
        return penaltyAttackModifiersSoFar <= 6
      } else {
        return true
      }
    })

    return (
      <AttackModifierList>
          <Title>Choose Attack Deck</Title>
          <div>
          {
              attackModifiersToShow.map(attackModifier => {
                return <AttackModifierAspectContainer key={attackModifier.id}>
                  <AttackModifierInnerContainer attackModifier = { attackModifier } />
                  <AttackModifierBorder 
                    selected={ this.isAttackModifierSelected(attackModifier)}
                    onClick = { ()=> this.onClickAttackModifier(attackModifier) }
                  />
                </AttackModifierAspectContainer>
              })
            }            


            {/* <SectionView
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
            /> */}
          </div>
          <BottomBar>
            <Status>
              Attack modifiers selected: {this.props.container.attackDeckManager.selectedAttackModifiers.length}
            </Status>
            <Controls>
              <Button onClick={this.onClickChangeCharacter}>Change Character</Button>
              <Button onClick={this.onClickChangeDeck}>Change Deck</Button>
              <Button onClick={this.onClickPlay}>Play Game</Button>
            </Controls>
          </BottomBar>
      </AttackModifierList>
    )
  }

  onClickAttackModifier(attackModifier: AttackModifier) {
    if (this.isAttackModifierSelected(attackModifier)) {
      this.props.container.attackDeckManager.unselectAttackModifier(attackModifier)
      Logger.log(`Removed attack modifier ${attackModifier.id} from deck`)
    } else {
      this.props.container.attackDeckManager.selectAttackModifier(attackModifier)
      Logger.log(`Removed attack modifier ${attackModifier.id} from deck`)
    }
  }

  onClickChangeCharacter() {
    const confirmed = confirm("Changing character will reset the current game. Are you sure?")
    if (confirmed) {
      this.props.container.setupStateUIManager.changeCharacter()
    }
  }

  onClickChangeDeck() {
    this.props.container.setupStateUIManager.changeDeck()
  }

  onClickPlay() {
    this.props.container.setupStateUIManager.play()
  }


}