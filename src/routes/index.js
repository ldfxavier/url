import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Routes";

import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Perfil from "../pages/Perfil";
import Url from "../pages/Url";
import UrlDetails from "../pages/UrlDetails";

const Routes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/signup" exact component={SignUp} />
			<Route path="/perfil" isPrivate exact component={Perfil} />
			<Route path="/url" isPrivate exact component={Url} />
			<Route path="/urldetails/:id" isPrivate exact component={UrlDetails} />
		</Switch>
	);
};

export default Routes;
