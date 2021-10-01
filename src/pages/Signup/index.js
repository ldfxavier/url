import React, { useState } from "react";
import api from "~/services/api";

import { useHistory } from "react-router-dom";

import { Alert } from "rsuite";
import Loading from "~/components/Loading";

import { Container, ButtonBack } from "./styles";

const Signup = () => {
	const { push } = useHistory();

	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [confirmar, setConfirmar] = useState("");

	const [loading, setLoading] = useState(false);

	const signUp = (e) => {
		e.preventDefault();
		setLoading(true);

		if (senha === confirmar) {
			api.post("/user", {
				email,
				name:nome,
				password: senha,
			})
				.then((response) => {
					localStorage.setItem(
						"@Usuario",
						JSON.stringify(response.data)
					);
					Alert.success(response.data.message);
					setTimeout(() => {
						push("/perfil");
					}, 1000);
				})
				.catch((error) => {
					Alert.error(error.response.data.message);
				})
				.finally((response) => setLoading(false));
		} else {
			Alert.error("As senhas não são iguais!");
		}
	};

	return (
		<Container>
			{loading && <Loading />}

			<form onSubmit={signUp} method="POST">
				<input
					type="text"
					placeholder="Nome completo"
					value={nome}
					onChange={(e) => setNome(e.target.value)}
				/>

				<input
					type="text"
					placeholder="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Senha"
					value={senha}
					onChange={(e) => setSenha(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Confirmar senha"
					value={confirmar}
					onChange={(e) => setConfirmar(e.target.value)}
				/>
				<button className="btn_padrao" appearance="primary">
					Criar conta
				</button>
			</form>
			<a href="/">
				<ButtonBack>Já tenho conta</ButtonBack>
			</a>
		</Container>
	);
};

export default Signup;
