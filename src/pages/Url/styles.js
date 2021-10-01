import styled from "styled-components";

import { Table as RTable } from "rsuite";

import colors from "~/styles/colors";
import { shade } from "polished";

export const Container = styled.div`
	-webkit-box-pack: center;
	justify-content: center;
	margin: 0 auto;
	max-width: 650px;
`;

export const Table = styled(RTable)`
	background: ${colors.backgroundSecundary};
	margin-top: 20px;
	border-radius: 5px;
	height: 70vh !important;

	.rs-table-cell, .rs-table-row-header, .rs-table-row{
		background-color: ${colors.backgroundSecundary};
		border-bottom: 1px solid #fff;
	}
	.rs-table-body-row-wrapper{
		height: 70vh !important;
	}
	.rs-table-row{
		cursor: pointer;
	}
`;

export const Input = styled.input`
	width: 100%;
	height: 50px;
	border-radius: 5px;
	border: 1px solid ${shade(0.3, colors.background)};
	background-color: #fff;
	padding: 7px 11px;
	font-size: 14px;
	line-height: 1.42857143;
	color: ${colors.background};
`;

export const Row = styled.div`
margin-top: 10px;
	display: flex;
	justify-content: row;
`;

export const Button = styled.button`
	width: 200px;
	height: 50px;
	background-color: #57C6F2;
	color: #fff;
	border-radius: 5px;
	margin-left: 10px;
`;