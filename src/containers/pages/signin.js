import React, { Component } from 'react';
import { Keys } from '../../stores';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter, Redirect } from 'react-router-dom';
import { AppRequest } from '../../utilities/appRequest';

@inject(Keys.app, Keys.router)
@withRouter
@observer
export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.wsid = React.createRef();
		this.password = React.createRef();
		this.rememberMe = React.createRef();
		this.message = React.createRef();
	}

	componentWillMount() {
		this.setState({showMessage: false});
	}

	handleBtnLoginClick(event) {
		event.preventDefault();
		if(this.wsid.current.value === '1' && this.password.current.value === '1') {
			this.message.current.innerHTML = "";
			this.props.app.setLoginStatus(true);
			if(this.rememberMe.current.checked)
				this.props.app.setRememberMe();
			this.props.router.push('/dashboard');
			// AppRequest.post('http://127.0.0.1:8080/login', {wsid: this.wsid.current.value, password: this.password.current.value}, this.callback);
			AppRequest.get('https://trackingapi.yamatoamerica.com/GetTrackingHistory?userid=UST0035&passwd=Cwrtj)h&trackingid=111111111&lang=en&display=xml', this.callback);
		}
		else {
			this.message.current.innerHTML = "username or password is incorrect";
			this.password.current.value = "";
			this.changeShowMessageState(true);
		}
	}

	@action
	callback(res) {
		console.log(res);
	}

	changeShowMessageState(status) {
		if (status !== undefined)
			this.setState({...this.state, showMessage: status});
		else
			this.setState({...this.state, showMessage: !this.state.showMessage});
	}

	render() {
		if(this.props.app.getLoginStatus() && this.props.app.getRememberMe()){
			this.props.app.clearLocalStorage();
			return(
				<Redirect to={'/dashboard'}/>
			)
		}
		return(
			<div className={'login-box'}>
				<div className={'login-logo'}>
					Yamato-Ship
				</div>
				<div className="alert alert-danger login-message-title" hidden={!this.state.showMessage}>
					<span ref={this.message}/>
				</div>
				<div className={'login-box-body'}>
					<div className={'row form-group'}>
						<div className={'col-xs-3 login-wsid-title'}>
							WSID
						</div>
						<div className={'col-xs-9'}>
							<input type={'text'} className={'login-wsid form-control'} ref={this.wsid}/>
						</div>
					</div>
					<div className={'row form-group login-password-title'}>
						<div className={'col-xs-3'}>
							PASSWORD
						</div>
						<div className={'col-xs-9'}>
							<input type={'password'} className={'login-password form-control'} ref={this.password}/>
						</div>
					</div>
					<div className={'row form-group'}>
						<div className={'col-xs-12'}>
							<input type="checkbox" id={'remember-me'} ref={this.rememberMe}/> <label className={'remember-label'} htmlFor={'remember-me'}>Always login without this window</label>
						</div>
					</div>
					<div className={'row form-group aria-btn-login'}>
						<div className={'col-xs-4 col-xs-offset-8'}>
							<button onClick={this.handleBtnLoginClick.bind(this)} className="btn btn-primary btn-block btn-flat">LOGIN</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}