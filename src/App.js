import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import './App.css';
import { RouterDefine } from './constants/RouterDefine';
import SignIn from './containers/pages/signin';
import Error404 from "./containers/pages/404";
import { stores } from './stores';
import DashBoard from "./containers/dashboard";
import UserMaintenance from "./containers/userMaintenance";
import ShipperMaintenance from "./containers/shipperMaintenance";
import ZipFileUpload from "./containers/zipFileUpload";

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, stores.router);

export default class App extends Component {
	render() {
		return(
			<Provider {...stores}>
				<Router history={history}>
					<div>
						<Switch>
							<Route path={RouterDefine.LOGIN} component={SignIn} />
							<Route path={RouterDefine.MENU} component={DashBoard}/>
							<Route path={RouterDefine.USER_MAINTENANCE} component={UserMaintenance}/>
							<Route path={RouterDefine.SHIPPER_MAINTENANCE} compoentn={ShipperMaintenance}/>
							<Route path={RouterDefine.ZIP_FILE_UPLOAD} compoentn={ZipFileUpload}/>
							<Route paht={'*'} component={Error404}/>
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}
