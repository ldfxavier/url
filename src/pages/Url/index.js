import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
	Container,
	Table,
	Input,
	Row,
	Button
} from "./styles";
import { Header } from "~/components";

import "./styles.css";

import { Alert } from "rsuite";

import api from "~/services/api";

import Loading from "~/components/Loading";

function Url() {
	const { push } = useHistory();
	const usuario = JSON.parse(localStorage.getItem("@Usuario"));

	const [data, setData] = useState("");
	const [url, setUrl] = useState("");

	const [loading, setLoading] = useState(false);

	const getUrlList = () => {
		api.get("/url", {
			headers: {
				Authorization: `Bearer ${usuario?.access_token}`,
			},
		})
			.then(({ data }) => {
				setData(data || "");
			})
			.catch((error) => {
				Alert.error(error.response.data.message);
			})
			.finally((response) => setLoading(false));

	}

	const addUrl = () => {		
		if (url === "") {
			Alert.error("A url deve ser preenchida!");
		} else {
			api.post(
				`/url`,
				{
					url,
				},
				{
					headers: {
						Authorization: `Bearer ${usuario?.access_token}`,
					},
				}
			)
				.then((response) => {
					setUrl('');
					getUrlList();
					Alert.success("Url adicionada com sucesso!");
				})
				.catch((error) => {
					Alert.error(error.response.data.message);
				});
		}
	}

	useEffect(() => {
		setLoading(true);
		getUrlList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setInterval(() => {
			getUrlList();
		}, 60000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);

	return (
		<>
			{loading && <Loading />}
			<Header />
			<Container>
				<Row>
					<Input 
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>					
					<Button onClick={addUrl}>Adicionar URL</Button>
				</Row>
				<Table
					data={data.items}
					onRowClick={data => {
						push(`/urldetails/${data.id}`);
					}}
				>
					<Table.Column width={70} align="center" fixed>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.Cell dataKey="id" />
					</Table.Column>

					<Table.Column width={500} fixed>
						<Table.HeaderCell>URL</Table.HeaderCell>
						<Table.Cell dataKey="url" />
					</Table.Column>

					<Table.Column width={80}>
						<Table.HeaderCell>STATUS</Table.HeaderCell>
						<Table.Cell dataKey="status" />
					</Table.Column>
				</Table>
			</Container>
		</>
	);
}

export default Url;
