import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { Stack } from '../Logic/PlayingManager';
import { SectionView, SectionViewDelegate } from './SectionView';
import { Card } from '../Logic/Card';
import { Controls, CardList, Title, CardAspectContainer, CardInnerContainer, CardBorder, BottomBar, Status } from './ChooseDeckView.styles';
import { Button } from './CommonUI.styles';
import { Logger } from '../Infra/Logger';

interface Props {container: Container}

@observer
export class ChooseDeckView extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
    this.onClickCard = this.onClickCard.bind(this)
    this.onClickChangeCharacter = this.onClickChangeCharacter.bind(this)
    this.onClickChangeAttackDeck = this.onClickChangeAttackDeck.bind(this)
    this.onClickPlay = this.onClickPlay.bind(this)
  }

  isCardSelected(card: Card) {
    return !!this.props.container.deckManager.selectedCards.find(curCard => card.id == curCard.id)
  }

  render() {

    const numUnselectedCards = this.props.container.deckManager.unselectedCards.length
    const numSelectedCards = this.props.container.deckManager.selectedCards.length
    
    const numSelectedColumns = Math.max(2, Math.ceil((numSelectedCards) / 3))
    const numUnselectedColumns = 8 - numSelectedColumns

    return (
      <CardList>
          <Title>Choose Deck</Title>
          <div>
          {
              this.props.container.characterManager.characterCards.map(card => {
                return <CardAspectContainer key={card.id}>
                  <CardInnerContainer card = { card } />
                  <CardBorder 
                    selected={ this.isCardSelected(card)}
                    onClick = { ()=> this.onClickCard(card) }
                  />
                </CardAspectContainer>
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
              Cards selected: {this.props.container.deckManager.selectedCards.length}
            </Status>
            <Controls>
              <Button onClick={this.onClickChangeCharacter}>Change Character</Button>
              <Button onClick={this.onClickChangeAttackDeck}>Change Attack Deck</Button>
              <Button onClick={this.onClickPlay}>Play Game</Button>
            </Controls>
          </BottomBar>
      </CardList>
    )
  }

  onClickCard(card: Card) {
    if (this.isCardSelected(card)) {
      this.props.container.deckManager.unselectCard(card)
      Logger.log(`Removed card ${card.id} from deck`)
    } else {
      this.props.container.deckManager.selectCard(card)
      Logger.log(`Added card ${card.id} to deck`)
    }
  }

  onClickChangeCharacter() {
    const confirmed = confirm("Changing character will reset the current game. Are you sure?")
    if (confirmed) {
      this.props.container.setupStateUIManager.changeCharacter()
    }
  }

  onClickChangeAttackDeck() {
    this.props.container.setupStateUIManager.changeAttackDeck()
  }

  onClickPlay() {
    this.props.container.setupStateUIManager.play()
  }


}