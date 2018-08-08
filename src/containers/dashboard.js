import React from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { Keys } from '../stores';
import { inject, observer } from 'mobx-react';
import { RouterDefine } from '../constants/RouterDefine';

@inject(Keys.app, Keys.router)
@withRouter
@observer
 export default class DashBoard extends React.Component {
	handleBtnLogoutOnClick() {
		this.props.app.setLoginStatus(false);
		this.props.app.clearLocalStorage();
		this.props.router.push(RouterDefine.MENU);
	}

	render() {
		if (!this.props.app.getLoginStatus()) {
			this.props.app.clearLocalStorage();
			return (
				<Redirect to={RouterDefine.LOGIN}/>
			);
		}
		return(
			<div className={'container'}>
				<div className={'menu-body'}>
					<div className={'menu-header'}>
						<div className={'row'}>
							<div className={'col-xs-6 col-xs-offset-3 menu-header-center'}>
								<h1 style={{textAlign: "center"}}>Menu</h1>
							</div>
							<div className={'col-xs-3 menu-header-right'}>
								<a onClick={this.handleBtnLogoutOnClick.bind(this)}>logout</a>
							</div>
						</div>
					</div>
					<div className={'menu-items'}>
						<div className={'row'}>
							<div className={'col-xs-12 menu-item'}>
								<Link to={RouterDefine.USER_MAINTENANCE} style={{fontSize: '22px'}}>
									User Maintenance
								</Link>
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-xs-12 menu-item'}>
								<Link to={RouterDefine.SHIPPER_MAINTENANCE} style={{fontSize: '22px'}}>
									Shipper Maintenance
								</Link>
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-xs-12 menu-item'}>
								<Link to={RouterDefine.ZIP_FILE_UPLOAD} style={{fontSize: '22px'}}>
									Zip File Upload
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}