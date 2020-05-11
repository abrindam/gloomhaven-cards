import * as React from 'react';
import { observer } from "mobx-react";
import { Container } from '../Container';

import { Card } from '../Logic/Card';
import { Button } from './CommonUI.styles';
import { CardAspectContainer, CardInnerContainer, CardList, CardBorder, Title, Controls } from './ChooseCharacterView.styles';
import { Logger } from '../Infra/Logger';

interface Props {container: Container}

@observer
export class ChooseCharacterView extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
    this.onClickContinue = this.onClickContinue.bind(this)
  }

  render() {
    const characterManager = this.props.container.characterManager
    const gloomhavenDataService = this.props.container.gloomhavenDataService

    const charactersAsCardBacks = characterManager.allCharacters
    // .filter(character => character.abbrev == "SK")
    .map(character => {
      const backAbilityCard = gloomhavenDataService.backCardForCharacter(character)
      return new Card(backAbilityCard.id, backAbilityCard.imageBasename, character)
    })

    return (
      <CardList>
          <Title>Choose Character</Title>
          <div>
            {
              charactersAsCardBacks.map(cardBack => {
                return <CardAspectContainer key={cardBack.id}>
                  <CardInnerContainer card = { cardBack} />
                  <CardBorder 
                    selected={ characterManager.character.abbrev == cardBack.character.abbrev }
                    onClick = { ()=> this.onClickCard(cardBack) }
                  />
                </CardAspectContainer>
              })
            }            
          </div>
          <Controls>
            <Button onClick={this.onClickContinue}>Continue</Button>
          </Controls>
      </CardList>
    )
  }

  onClickCard(card: Card) {
    this.props.container.characterManager.character = card.character
    Logger.log(`Chose character ${card.character.abbrev}`)
  }

  onClickContinue() {
    this.props.container.setupStateUIManager.changeDeck()
  }
}