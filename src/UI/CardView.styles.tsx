
import styled from "styled-components"
import { CardImages } from "./CardImages";
import { aspectRatioVW } from "./CssUtils";
import { Card } from "../Logic/Card";

const cardAspectRatio = 3/2
const paddingVW = 0.25

const fudgeFactor = 0.99

const width = 12.5 * fudgeFactor - paddingVW * 2

export const CardAspectContainer = styled.div<{overflowCorrection: number}>`
  width: ${aspectRatioVW(width)};
  padding-top: ${aspectRatioVW(12.5 * fudgeFactor * cardAspectRatio - paddingVW * 2)};
  margin: ${aspectRatioVW(paddingVW)};
  position: relative;
  display: inline-block;
  
  margin-right: ${props => aspectRatioVW(paddingVW + (12.5 * fudgeFactor) * -props.overflowCorrection)};
  &:hover {
    z-index: 1
  }
`;

export const CardInnerContainer = styled.div<{card: Card, selected: boolean}>`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  border: ${ props => props.selected ? "3px solid red" : "1px solid black" };
  background-image: url(${ props => CardImages.get(props.card) });
  background-size: cover
`;

export const CardMarker = styled.div<{location: [number, number]}>`
  position: absolute;
  top: ${ props => aspectRatioVW(width * cardAspectRatio * props.location[1] - width * 0.15 / 2)};
  left: ${ props => aspectRatioVW(width * props.location[0] - width * 0.15 / 2)};
  width: ${aspectRatioVW(width * 0.15)};
  height: ${aspectRatioVW(width * 0.15)};
  background-color: darkgray;
  border: 3px solid black;
  border-radius: ${aspectRatioVW(width * 0.15)};
`;
