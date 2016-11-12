import React from 'react';
import { Button, Col, Container, FormGroup, Form, Input,
    FormFeedback, NavLink, Label, Alert } from 'reactstrap';
import axios from 'axios';
import cookie from 'react-cookie';
import { withRouter } from 'react-router';

import Style from '../main.scss';
import config from '../../../config';
import { t } from '../../translator'

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loginValue: '',
            passwordValue: '',
            emailValue: '',
            login: '',
            email: '',
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

    handleEmailChange(event) {
        this.setState({
            emailValue: event.target.value,
            email: ''
        });
    }

    handlePasswordChange(event) {
        this.setState({
            passwordValue: event.target.value,
            password: event.target.value.length > 3 ? { state: 'success' } : ''
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        const fields = ['login', 'email', 'password'];
        for (let i in fields) {
            if (this.state[fields[i] + 'Value'] === '') {
                let fieldState = {};
                fieldState[fields[i]] = { state: 'danger', msg: t('tooShort') };
                this.setState(fieldState);
                return;
            }
        }

        const _this = this;

        axios.post(`${config.apiUrl}users`, {
                login: this.state.loginValue,
                email: this.state.emailValue,
                password: this.state.passwordValue
            })
            .then(function (res) {
                //cookie.save('userToken', res.data.token, { path: '/' });
                cookie.save('userName', res.data.login, { path: '/' });
                this.props.router.push('/profile');
                window.location.reload();
            })
            .catch(function (error) {
                if (error.response.data.error) {
                    _this.setState({
                        alert: { visible: true, msg: error.response.data.error.error_msg.split(') ').pop() }
                    });
                }
            });

        this.setState({ password: '' });
    }

    render() {
        return (
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <Container fluid className={Style.login}>
                    <h1 className="display-4">{t('signup')}</h1>
                    <br />
                    <Alert color="danger" isOpen={this.state.alert.visible}>{this.state.alert.msg}</Alert>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup color={this.state.login.state}>
                            <Label>{t('Login')}</Label>
                            <Input state={this.state.login.state} onChange={this.handleLoginChange} size="lg" />
                            <FormFeedback className="small">{this.state.login.msg}</FormFeedback>
                        </FormGroup>
                        <FormGroup color={this.state.email.state}>
                            <Label>Email</Label>
                            <Input state={this.state.email.state} onChange={this.handleEmailChange} size="lg" />
                            <FormFeedback className="small">{this.state.email.msg}</FormFeedback>
                        </FormGroup>
                        <FormGroup color={this.state.password.state}>
                            <Label>{t('password')}</Label>
                            <Input state={this.state.password.state} onChange={this.handlePasswordChange} size="lg" />
                            <FormFeedback className="small">{this.state.password.msg}</FormFeedback>
                        </FormGroup>
                        <Button color="info" size="lg" block>{t('signup')}</Button>
                        <Label>{t('haveAccount')}</Label>
                        <NavLink className="float-xs-right" href="/login">{t('login')}</NavLink>
                        <br />
                    </Form>
                </Container>
            </Col>
        );
    }
};

export default withRouter(Signup);