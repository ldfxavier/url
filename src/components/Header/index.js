import React from "react";

import { useHistory, Link } from "react-router-dom";

import { Container } from "./styles";

const Header = () => {
	const { push } = useHistory();

	function logout() {
		localStorage.clear();
		push("/");
	}

	return (
		<Container>
			<div className="menu">
				<Link to="/url">
					<strong>URLs</strong>
				</Link>
				<Link to="/" onClick={logout}>
					<strong>Sair</strong>
				</Link>
			</div>
		</Container>
	);
};

export default Header;
