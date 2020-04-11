import styled from "styled-components";
import { aspectRatioVW, aspectRatioVH } from "./CssUtils";

export const Controls = styled.div`
  width: ${ aspectRatioVW(100) };
  margin-top: 10px;
  text-align: right;

  & button {
    margin-left: 10px;
  }
`;
