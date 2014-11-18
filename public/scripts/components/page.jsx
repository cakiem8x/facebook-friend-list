define(function(require) {
    'use strict';

    var BPromise = require('bluebird');
    var $ = require('jquery');
    var React = require('react');
    var Button = require('react-bootstrap/Button');
    var ButtonToolbar = require('react-bootstrap/ButtonToolbar');

    return React.createClass({
        getInitialState: function() {
            return {
                loading: true
            };
        },
        componentDidMount: function() {
            BPromise.resolve($.ajax({
                type: 'get',
                url: '/api/auth',
                dataType: 'json'
            }))
            .bind(this)
            .then(function(responseData) {
                if (responseData.authenticated) {
                    this.setState({
                        authenticated: true
                    });
                } else {
                    this.setState({
                        authenticated: false
                    });
                }
                this.setState({
                    loading: false
                });
            });
        },
        render: function() {
            if (this.state.loading) {
                return <h1>Loading...</h1>;
            }

            var loginButton;
            if (this.state.authenticated) {
                loginButton = <Button onClick={this.onLogoutClicked} bsStyle="primary" bsSize="large">
                    Logout
                </Button>;
            } else {
                loginButton = <Button onClick={this.onLoginClicked} bsStyle="primary" bsSize="large">
                    Login
                </Button>;
            }

            return <div>
                <ButtonToolbar>
                    {loginButton}
                </ButtonToolbar>
            </div>;
        },
        onLoginClicked: function() {
            document.location.href = '/login';
        },
        onLogoutClicked: function() {
            document.location.href = '/logout';
        }
    });
});
