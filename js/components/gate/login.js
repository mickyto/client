import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { Button, Col, Container, FormGroup, Form,
    Input, FormFeedback, NavLink, Label, Alert } from 'reactstrap';

import Style from '../main.scss';
import config from '../../../config';
import { t } from '../../translator'

class Login extends React.Component {

    componentDidMount() {
        if (cookie.load('userToken')) {
            browserHistory.push('/profile');
        }
    }

    constructor(props) {
        super(props);

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loginValue: '',
            passwordValue: '',
            login: '',
            password: '',
            alert: { visible: false }
        };
    }
    
    handleLoginChange(event) {
        this.setState({
            loginValue: event.target.value,
            login: ''
        });
    }

    handlePasswordChange(event) {
        this.setState({
            passwordValue: event.target.value,
            password: event.target.value.length > 7 ? { state: 'success' } : ''
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        const fields = ['login', 'password'];
        for (let i in fields) {
            if (this.state[fields[i] + 'Value'] === '') {
                let fieldState = {};
                fieldState[fields[i]] = { state: 'danger', msg: t('tooShort') };
                this.setState(fieldState);
                return;
            }
        }

        const _this = this;
        
        axios.get(`${config.apiUrl}auth?login=${this.state.loginValue}&password=${this.state.passwordValue}`)
            .then(res => {

                cookie.save('userToken', res.data.token, { path: '/' });
                cookie.save('userName', res.data.login, { path: '/' });
                browserHistory.push('/profile');
                window.location.reload();
            })
            .catch(function (error) {

                if (error.response.data.error) {
                    _this.setState({
                        alert: { visible: true, msg: t(`error_${error.response.data.error.error_code}`) }
                    });
                }
            });
        
        this.setState({ password: '' });
    }

    render() {
        return (
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <Container fluid className={Style.login}>
                    <h1 className="display-4">{t('login')}</h1>
                    <br />
                    <Alert color="danger" isOpen={this.state.alert.visible}>{this.state.alert.msg}</Alert>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup color={this.state.login.state}>
                            <Label>{t('loginOrEmail')}</Label>
                            <Input state={this.state.login.state} onChange={this.handleLoginChange} size="lg" />
                            <FormFeedback className="small">{this.state.login.msg}</FormFeedback>
                        </FormGroup>
                        <FormGroup color={this.state.password.state}>
                            <Label>{t('password')}</Label>
                            <Input type="password" state={this.state.password.state} onChange={this.handlePasswordChange} size="lg" />
                            <FormFeedback className="small">{this.state.password.msg}</FormFeedback>
                        </FormGroup>
                        <Button color="info" size="lg" block>{t('login')}</Button>
                        <Label>{t('haveNoAccount')}</Label>
                        <NavLink className="float-xs-right" href="/signup">{t('signup')}</NavLink>
                        <br />
                    </Form>
                </Container>
            </Col>
        );
    }
}

export default Login;
