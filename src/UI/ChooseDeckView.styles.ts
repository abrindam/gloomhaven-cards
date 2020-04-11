import styled from "styled-components";
import { aspectRatioVW, aspectRatioVH } from "./CssUtils";
import { CardImages } from "./CardImages";
import { Card } from "../Logic/Card";

const sectionTitleHeightVH = 2
const sectionTitleVerticalMarginVH = 0.5

const fudgeFactor2 = 1 //0.91

export const CardList = styled.div`
  display: inline-block;
  height: ${props => aspectRatioVH(3 / 3.33 * 100 * fudgeFactor2 + sectionTitleHeightVH + sectionTitleVerticalMarginVH * 2)};
  width: ${props => aspectRatioVW(8 / 8 * 100 * fudgeFactor2)};
`;

export const Title = styled.div`
  text-align: center;
  font-size: ${aspectRatioVH(sectionTitleHeightVH)};
  font-weight: bold;
  height: ${aspectRatioVH(sectionTitleHeightVH)};
  margin-top: ${aspectRatioVH(sectionTitleVerticalMarginVH)};
  margin-bottom: ${aspectRatioVH(sectionTitleVerticalMarginVH)};
`;



const cardAspectRatio = 3/2
const paddingVW = 0.25

const fudgeFactor = 0.99

const width = 12.5 * fudgeFactor - paddingVW * 2


export const CardAspectContainer = styled.div`
  width: ${aspectRatioVW(width)};
  padding-top: ${aspectRatioVW(12.5 * fudgeFactor * cardAspectRatio - paddingVW * 2)};
  margin: ${aspectRatioVW(paddingVW)};
  position: relative;
  display: inline-block;
  overflow: hidden;

  margin-right: ${props => aspectRatioVW(paddingVW + (12.5 * fudgeFactor) * -0.22)};

  &:hover {
    z-index: 1
  }
`;

export const CardInnerContainer = styled.div<{card: Card}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${ props => CardImages.get(props.card) });
  background-size: cover
`;

export const CardBorder = styled.div<{selected: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: ${ props => props.selected ? "3px solid #4D4" : "0px" };
`;

export const BottomBar = styled.div`
  width: ${ aspectRatioVW(100) };
  margin-top: 10px;
  position: relative;
  
`;

export const Status = styled.div`
  left: 3px;
  right: 3px;
  position:absolute;
  text-align: left;
`;

export const Controls = styled.div`
  left: 3px;
  right: 3px;
  position:absolute;
  text-align: right;
  padding-right: 3px;

  & button {
    margin-left: 10px;
  }
`;
