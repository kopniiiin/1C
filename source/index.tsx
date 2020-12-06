import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import App from './app';

ReactDOM.render(
    <ThemeProvider theme={theme}><App/></ThemeProvider>,
    document.querySelector('#root'),
);
