import styled from "styled-components"
import { aspectRatioVW, aspectRatioVH } from "./CssUtils";

const sectionTitleHeightVH = 2
const sectionTitleVerticalMarginVH = 0.5

const fudgeFactor = 1 //0.91

export const Section = styled.div<{horizontalCards: number, verticalCards: number, topPercent: number, leftPercent: number, showValidDrop: boolean, showValidDropHover: boolean}>`
  border-bottom: 1px solid gray;
  border-right: 1px solid gray;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  height: ${props => aspectRatioVH(props.verticalCards / 3.33 * 100 * fudgeFactor + sectionTitleHeightVH + sectionTitleVerticalMarginVH * 2)};
  width: ${props => aspectRatioVW(props.horizontalCards / 8 * 100 * fudgeFactor)};
  background-color: ${props => props.showValidDrop ? (props.showValidDropHover ? "#AFA" : "#DFF") : "white"}
`;

export const SectionTitle = styled.div`
  text-align: center;
  font-size: ${aspectRatioVH(sectionTitleHeightVH)};
  font-weight: bold;
  height: ${aspectRatioVH(sectionTitleHeightVH)};
  margin-top: ${aspectRatioVH(sectionTitleVerticalMarginVH)};
  margin-bottom: ${aspectRatioVH(sectionTitleVerticalMarginVH)};
`;
