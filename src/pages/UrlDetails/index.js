import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
	Container,
	Body,
	Main,
	Bloco,
	TextArea
} from "./styles";
import { Header } from "~/components";

import "./styles.css";

import {
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Alert,
} from "rsuite";

import api from "~/services/api";

import Loading from "~/components/Loading";

function UrlDetails() {
	const { id } = useParams();

	const usuario = JSON.parse(localStorage.getItem("@Usuario"));

	const [url, setUrl] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState("");

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		api.get(`/url/${id}`, {
			headers: {
				Authorization: `Bearer ${usuario?.access_token}`,
			},
		})
			.then(({ data }) => {
				console.log(data);
				setUrl(data.url || "");
				setContent(data.content || "");
				setStatus(data.status || "");
			})
			.catch((error) => {
				Alert.error(error.response.data.message);
			})
			.finally((response) => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDados = () => {
		if (url === "") {
			Alert.error("A url deve ser preenchida!");
		} else {
			api.put(
				`/url/${id}`,
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
					Alert.success("Dados atualizado com sucesso!");
				})
				.catch((error) => {
					Alert.error(error.response.data.message);
				});
		}
	};

	return (
		<>
			{loading && <Loading />}
			<Header />
			<Container>
				<Body>
					<Main>
						<Bloco>
							<h1>Dados</h1>
							<Form fluid onSubmit={() => handleDados()}>
								<FormGroup>
									<ControlLabel>Url</ControlLabel>
									<FormControl
										value={url}
										onChange={(value) => setUrl(value)}
									/>
									<ControlLabel>Status</ControlLabel>
									<FormControl
										value={status}					
										disabled
									/>
									<ControlLabel>Content</ControlLabel>
									<TextArea
										value={content}
										disabled
									/>
								</FormGroup>
								<button className="btn_small">Atualizar</button>
							</Form>
						</Bloco>
					</Main>
				</Body>
			</Container>
		</>
	);
}

export default UrlDetails;
