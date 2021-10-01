import styled from "styled-components";

import colors from "~/styles/colors";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0;
	height: 100vh;

	img {
		width: 150px;
		margin-bottom: 20px;
	}

	form {
		max-width: 300px;
		input {
			background-color: #fff;
			height: 36px;
			padding: 0px 10px 0px 10px;
			line-height: 36px;
			margin-bottom: 10px;
			border: 1px solid #e2e2e2;
			color: ${colors.background};
			width: 100%;
			margin-bottom: 24px;
			border-radius: 5px;
		}
	}
`;

export const ButtonBack = styled.div`
	padding: 10px 20px;
	color: ${colors.primary};
	width: 100%;
	border-radius: 0px;
	text-align: center;
	margin-top: 20px;
	&:hover {
		text-decoration: underline;
		color: ${colors.primary};
	}
	&:active {
		color: ${colors.secundary};
	}
`;
