import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import './Account.css'


export default class Account extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = { error: null }

    handleSubmitJwtAuth = e => {
        e.preventDefault();
        this.setState({error: null});
        const { username, password } = e.target;

        AuthApiService.postLogin({
            username: username.value.toLowerCase(),
            password: password.value
        })
        .then(res => {
            username.value = '';
            password.value = '';
            TokenService.saveAuthToken(res.authToken);
        })
        .then(() => this.props.onLoginSuccess())
        .catch(res => {
            console.log(res)
            this.setState({ error: res.error })
        })
    }

    render() {
        return (
            <section className="info-section" id="info-section">
                <h2>Log Into Your Account</h2><br/>
                <form onSubmit={this.handleSubmitJwtAuth}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" defaultValue="fonz"/><br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" defaultValue="Password1!" /><br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        )
    }
}