import styled from "styled-components"
import { aspectRatioVW, aspectRatioVH } from "./CssUtils";

export const Row = styled.div`
white-space: nowrap
`;

const sectionTitleHeightVH = 2
const sectionTitleVerticalMarginVH = 0.5

const fudgeFactor = 1 //0.91


export const NonCardSection = styled.div<{horizontalCards: number, verticalCards: number}>`
  border-bottom: 1px solid gray;
  border-right: 1px solid gray;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  height: ${props => aspectRatioVH(props.verticalCards / 3.33 * 100 * fudgeFactor + sectionTitleHeightVH + sectionTitleVerticalMarginVH * 2)};
  width: ${props => aspectRatioVW(props.horizontalCards / 8 * 100 * fudgeFactor)};
  background-color:  "white";
  position: relative
`;

export const NonCardSectionTitle = styled.div`
  text-align: center;
  font-size: ${aspectRatioVH(sectionTitleHeightVH)};
  font-weight: bold;
  height: ${aspectRatioVH(sectionTitleHeightVH)};
  margin-top: ${aspectRatioVH(sectionTitleVerticalMarginVH)};
  margin-bottom: ${aspectRatioVH(sectionTitleVerticalMarginVH)};
`;

export const VerticalGroup = styled.div<{horizontalCards: number, verticalCards: number}>`
  display: inline-block;
  vertical-align: top;
  height: ${props => aspectRatioVH(props.verticalCards / 3.33 * 100 * fudgeFactor + sectionTitleHeightVH + sectionTitleVerticalMarginVH * 2)};
  width: ${props => aspectRatioVW(props.horizontalCards / 8 * 100 * fudgeFactor)};
  white-space: normal;
`;

export const Controls = styled.div`
  text-align: center;
  padding: 10px;

  & button {
    display: block;
    margin-bottom: 5px;
  }
`;