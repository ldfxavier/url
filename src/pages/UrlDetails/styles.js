import styled from "styled-components";

import colors from "~/styles/colors";

import { shade } from "polished";

export const Container = styled.div`
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	width: 100%;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-right: 5px;
`;

export const Body = styled.div`
	max-width: 1180px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-top: 20px;

	@media only screen and (max-device-width: 750px) {
		flex-direction: column;
	}

	h1 {
		height: 18px;
		color: ${colors.secundary};
		margin-bottom: 20px;
	}
	p {
		color: ${colors.secundary};
	}
`;

export const Bloco = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${shade(0.2, colors.background)};
	padding: 20px;
	margin-bottom: 20px;
	border-radius: 5px;
	min-width: 600px;

	@media only screen and (max-device-width: 750px) {
		width: 100%;
	}
`;

export const Main = styled.div`
	flex: 1 1 0%;

	@media only screen and (max-device-width: 750px) {
		width: 100%;
	}
`;

export const Input = styled.input`
	width: 100%;
	border-radius: 5px;
	border: 1px solid ${shade(0.3, colors.background)};
	padding: 7px 11px;
	font-size: 14px;
	line-height: 1.42857143;
	color: ${colors.secundary};
`;

export const TextArea = styled.textarea`
	width: 100%;
	min-height: 500px;
	border-radius: 5px;
	border: 1px solid ${shade(0.3, colors.background)};
	background-color: ${colors.background};
	padding: 7px 11px;
	font-size: 14px;
	line-height: 1.42857143;
	color: ${colors.secundary};
`;
