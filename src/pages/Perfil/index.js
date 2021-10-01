import React, { useState, useEffect } from "react";

import {
	Container,
	Body,
	Main,
	Bloco,
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

function Perfil() {
	const usuario = JSON.parse(localStorage.getItem("@Usuario"));

	const [errorVisible, setErrorVisible] = useState(false);
	const errorMessage = errorVisible ? "Campo obrigatório" : null;

	const [senhaAtual, setSenhaAtual] = useState("");
	const [senhaNova, setSenhaNova] = useState("");
	const [senhaConfirmar, setSenhaConfirmar] = useState("");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [loading, setLoading] = useState(false);

	function setStorage({ name, email }) {
		const user = {
			...usuario,
			dados: { ...usuario.dados, name, email },
		};
		localStorage.setItem("@Usuario", JSON.stringify(user));
	}

	useEffect(() => {
		setLoading(true);
		api.get("/auth/me", {
			headers: {
				Authorization: `Bearer ${usuario?.access_token}`,
			},
		})
			.then(({ data }) => {
				setName(data.name || "");
				setEmail(data.email || "");
			})
			.catch((error) => {
				Alert.error(error.response.data.message);
			})
			.finally((response) => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSenha = () => {
		if (senhaAtual === "" || senhaNova === "" || senhaConfirmar === "") {
			setErrorVisible(true);
		} else {
			api.put(
				"/user/password",
				{
					password: senhaAtual,
					password_new: senhaNova,
					password_confirm: senhaConfirmar,
				},
				{
					headers: {
						Authorization: `Bearer ${usuario?.access_token}`,
					},
				}
			)
				.then((response) => {
					setSenhaAtual("");
					setSenhaNova("");
					setSenhaConfirmar("");
					Alert.success("Senha atualizada com sucesso!");
				})
				.catch((error) => {
					Alert.error(error.response.data.message);
				});
		}
	};

	const handleDados = () => {
		if (name === "" || email === "") {
			Alert.error("Todos os campos são obrigatórios!");
		} else {
			api.put(
				"/user",
				{
					name:name,
					email,
				},
				{
					headers: {
						Authorization: `Bearer ${usuario?.access_token}`,
					},
				}
			)
				.then((response) => {
					setStorage({ name, email });
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
									<ControlLabel>Nome</ControlLabel>
									<FormControl
										value={name}
										onChange={(value) => setName(value)}
										errorMessage={errorMessage}
									/>
									<ControlLabel>E-mail</ControlLabel>
									<FormControl
										value={email}
										onChange={(value) => setEmail(value)}
										errorMessage={errorMessage}
									/>
								</FormGroup>
								<button className="btn_small">Atualizar</button>
							</Form>
						</Bloco>
						<Bloco>
							<h1>Acesso</h1>
							<Form fluid onSubmit={() => handleSenha()}>
								<FormGroup>
									<ControlLabel>Senha atual</ControlLabel>
									<FormControl
										type="password"
										value={senhaAtual}
										onChange={(value) =>
											setSenhaAtual(value)
										}
										errorMessage={errorMessage}
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Nova senha</ControlLabel>
									<FormControl
										type="password"
										value={senhaNova}
										onChange={(value) =>
											setSenhaNova(value)
										}
										errorMessage={errorMessage}
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Confirmar senha</ControlLabel>
									<FormControl
										type="password"
										value={senhaConfirmar}
										onChange={(value) =>
											setSenhaConfirmar(value)
										}
										errorMessage={errorMessage}
									/>
								</FormGroup>
								<button className="btn_small">
									Trocar senha
								</button>
							</Form>
						</Bloco>
					</Main>
				</Body>
			</Container>
		</>
	);
}

export default Perfil;
