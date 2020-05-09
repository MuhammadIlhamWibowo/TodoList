import React, { Component } from 'react';
import './Register.scss';
import Button from '../../../components/atoms/button';
import { registerUserAPI } from '../../../config/redux/action';
import { connect } from 'react-redux';

class Register extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (data) => {
        this.setState({
            [data.target.id]: data.target.value
        });
    }

    handleRegisterSubmit = async () => {
        const { email, password } = this.state
        const { history } = this.props
        const res = await this.props.registerAPI({ email, password }).catch(err => err);

        if (res) {
            console.log('register success')
            this.setState({
                email: '',
                password: ''
            })

            history.push('/')
        } else {
            console.log('register failed')
        }
    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register page</p>
                    <input className="input" id="email" placeholder="email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);