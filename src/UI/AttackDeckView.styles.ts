import styled from "styled-components";
import { aspectRatioVW, aspectRatioVH } from "./CssUtils";
import { AttackModifierImages } from "./AttackModifierImages";
import { AttackModifier } from "../Logic/AttackModifier";

const attackDeckBack = require('../Images/attack-card-back.jpg').default

const attackModifierAspectRatio = 2/3
const paddingVW = 0.25

const fudgeFactor = 0.99

const width = (100/8) * fudgeFactor - paddingVW * 2

export const AttackDeckViewContainer = styled.div`
  position: absolute;
  top: ${aspectRatioVH(3)};
  bottom: 0;
  left: 0;
  right: 0;
`;

export const DrawnModifiers = styled.div`
  margin-top: ${aspectRatioVH(1)};
  text-align: right;
  white-space: nowrap;
`;

export const UndrawnModifiers = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${aspectRatioVW((100/8) * fudgeFactor * attackModifierAspectRatio)};
  text-align: right
`;

export const AttackModifierAspectContainer = styled.div<{overflowCorrection: number}>`
  width: ${aspectRatioVW(width)};
  padding-top: ${aspectRatioVW((100/8) * fudgeFactor * attackModifierAspectRatio - paddingVW * 2)};
  margin: ${aspectRatioVW(paddingVW)};
  position: relative;
  display: inline-block;
  overflow: hidden;

  margin-left: ${props => aspectRatioVW(paddingVW + (100/8 * fudgeFactor) * -props.overflowCorrection)};

  &:hover {
    z-index: 1
  }
`;

export const AttackModifierInnerContainer = styled.div<{attackModifier: AttackModifier}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${ props => AttackModifierImages.get(props.attackModifier) });
  background-size: cover
`;

export const AttackModifierBackInnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${attackDeckBack});
  background-size: cover;
  cursor: pointer;
`;

export const NumberOfCardsAnnotation = styled.div`
  position:absolute;
  z-index: 1;
  right: 3;
  bottom: 3;
  height: ${aspectRatioVW(1.2)};
  width: ${aspectRatioVW(1.2)};
  background-color: white;
  border-radius: 100%;
  text-align: center;
  font-size: ${aspectRatioVW(0.7)};
  line-height: ${aspectRatioVW(1.2)};
`;


export const Controls = styled.div`
  top: 0;
  bottom: ${aspectRatioVW(paddingVW)};
  left: ${aspectRatioVW(paddingVW)};
  width: 50%;
  position: absolute;

  & button {
    display: block;
    margin-bottom: 5px;
  }
`;
