import styled from "styled-components";
import { aspectRatioVW, aspectRatioVH } from "./CssUtils";

export const Controls = styled.div`
  width: ${ aspectRatioVW(100) };
  margin-top: 10px;
  text-align: right;
`;


export const Button = styled.button`
	box-shadow:inset 0px -3px 7px 0px #29bbff;
	background:linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);
	background-color:#2dabf9;
	border-radius:3px;
	border:1px solid #0b0e07;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	padding:${ aspectRatioVH(0.8) } ${ aspectRatioVW(1.5) };
	text-decoration:none;
	text-shadow:0px 1px 0px #263666;
  &:hover {
    background:linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);
    background-color:#0688fa;
  }
  &:active {
    position:relative;
    top:1px;
  }
}

`;