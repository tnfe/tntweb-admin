
import './styles/index.css';
import './styles/antd.css';
import 'configs/runConcent';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'layout';
import * as serviceWorker from './serviceWorker';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { messages } from './locales/en/messages.js';

i18n.load('en', messages);
i18n.activate('en');

function getHostNode(id = 'root') {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement('div');
    node.id = id;
    document.body.appendChild(node);
  }
  return node;
}

const RootApp = () => (
  <I18nProvider i18n={i18n}>
    <App />
  </I18nProvider>
)

ReactDOM.render(<RootApp />, getHostNode('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
