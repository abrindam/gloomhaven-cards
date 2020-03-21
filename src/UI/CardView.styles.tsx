
import styled from "styled-components"
import { CardImages } from "./CardImages";
import { aspectRatioVW } from "./CssUtils";

const cardAspectRatio = 3/2
const paddingVW = 0.25

const fudgeFactor = 0.99

export const CardAspectContainer = styled.div<{overflowCorrection: number}>`
  width: ${aspectRatioVW(12.5 * fudgeFactor - paddingVW * 2)};
  padding-top: ${aspectRatioVW(12.5 * fudgeFactor * cardAspectRatio - paddingVW * 2)};
  margin: ${aspectRatioVW(paddingVW)};
  position: relative;
  display: inline-block;
  
  margin-right: ${props => aspectRatioVW(paddingVW + (12.5 * fudgeFactor) * -props.overflowCorrection)};
  &:hover {
    z-index: 1
  }
`;

export const CardInnerContainer = styled.div<{id: string, selected: boolean}>`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  border: ${ props => props.selected ? "3px solid red" : "1px solid black" };
  background-image: url(${ props => CardImages[props.id as keyof typeof CardImages] });
  background-size: cover
`;
