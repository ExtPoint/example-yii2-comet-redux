// Optimize chunks, fetch popular libs
import React from 'react';
import ReactDOM from 'react-dom';
import 'redux';
import 'react-redux';
import 'redux-logger';
import 'redux-thunk';
import axios from 'axios';

// Global react for Yii2 widget render
window.ReactDOM = ReactDOM;
window.React = React;

// Append csrf token to requests
axios.interceptors.request.use((config) => {
    const metaToken = document.querySelector('meta[name=csrf-token]');
    if (metaToken) {
        config.headers['X-CSRF-Token'] = metaToken.getAttribute('content');
    }

    return config;
});
