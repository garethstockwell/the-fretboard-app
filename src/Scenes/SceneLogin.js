/**
 * SceneLogin
 *
 * Login screen.
 */

'use strict';

import React, {
    Component,
    Navigator,
    Switch,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';

import Client from '../Client/Client';
const Button = require('../Components/Button');
const Spinner = require('../Components/Spinner');
const Styles = require('../Styles');

class SceneLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: true,
            status: '',
            spinner: false,
        }
    }

    login() {
        console.log('LoginView.login');

        this.setState({
            spinner: true,
            status: 'Logging in',
        });

        Client.logIn(
            this.state.username,
            this.state.password,
            this.onLoginComplete.bind(this));
    }

    onLoginComplete(result) {
        console.log('SceneLogin.loginComplete ' + result);

        this.setState({ spinner: false });

        if (result) {
            this.props.onLoginComplete();
        } else {
            this.setState({ status: 'Log in failed' });
        }
    }

    _renderStatus() {
        <View style={Styles.viewLoginStatus}>
            <Text style={Styles.textLoginStatus}>
                {this.state.status}
            </Text>
        </View>
    }

    _renderForm() {
        if (this.state.spinner) {
            return (
                <View style={Styles.viewLoginForm}>
                    <View style={Styles.viewSpinner}>
                        <Spinner />
                    </View>
                </View>
            );
        } else {
            // TODO: style is not respected when secureTextEntry == true
            // https://github.com/facebook/react-native/issues/4435
            // https://github.com/facebook/react-native/pull/6064
            return (
                <View style={Styles.viewLoginForm}>
                    <View style={Styles.viewLoginFormRow}>
                        <View style={Styles.viewLoginLabel}>
                            <Text style={Styles.textLoginLabel}>
                                Username
                            </Text>
                        </View>

                        <View style={Styles.viewLoginField}>
                            <TextInput
                                style={Styles.textInputLogin}
                                underlineColorAndroid={'#ffffff'}
                                onChangeText={(text) => this.setState({
                                    username: text,
                                    status: '',
                                })}
                                onSubmitEditing={(event) => {
                                    this.refs.password.focus();
                                }}
                            />
                        </View>
                    </View>

                    <View style={Styles.viewLoginFormRow}>
                        <View style={Styles.viewLoginLabel}>
                            <Text style={Styles.textLoginLabel}>
                                Password
                            </Text>
                        </View>

                        <View style={Styles.viewLoginField}>
                            <TextInput
                                ref='password'
                                style={Styles.textInputLogin}
                                underlineColorAndroid={'#ffffff'}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({
                                    password: text,
                                    status: '',
                                })}
                                onSubmitEditing={(event) => {
                                    this.login();
                                }}
                            />
                        </View>
                    </View>

                    <View style={Styles.viewLoginFormRow} />

                    <View style={Styles.viewLoginFormRow}>
                        <View style={Styles.viewLoginLabel}>
                            <Text style={Styles.textLoginLabel}>
                                Remember me
                            </Text>
                        </View>

                        <View style={Styles.viewLoginField}>
                            <View style={Styles.viewLoginSwitch}>
                                <Switch
                                    style={Styles.switch}
                                    value={this.state.rememberMe}
                                    onValueChange={(value) => this.setState({
                                        rememberMe: value,
                                        status: '',
                                    })}
                                />
                            </View>
                            <View style={Styles.container} />
                        </View>
                    </View>
                </View>
            );
        }
    }

    _renderToolbar() {
        return (
            <View style={Styles.viewToolbar}>
                <Button
                    onPress={() => this.props.onLoginComplete()}
                    text={'Skip'}
                    textStyle={{textAlign: 'left'}}
                />

                <Button
                    onPress={() => this.login()}
                    text={'Log in'}
                    textStyle={{textAlign: 'right'}}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={Styles.viewLogin}>
                <View style={Styles.viewLoginTitle}>
                    <Text style={Styles.textLoginTitle}>
                        The Fretboard
                    </Text>
                </View>

                <View style={Styles.viewLoginBody}>
                    <View style={Styles.container}>
                        <View style={Styles.viewLoginStatus}>
                            <Text style={Styles.textLoginStatus}>
                                {this.state.status}
                            </Text>
                        </View>

                        {this._renderForm()}

                        <View style={Styles.viewLoginStatus} />
                    </View>

                    {this._renderToolbar()}
                </View>
            </View>
        );
    }
}

module.exports = SceneLogin;
