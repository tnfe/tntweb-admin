import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

const Footer = () => (
  <div style={{ textAlign: 'center', padding: '5px' }}>
    Powered by <a href="https://github.com/concentjs/concent" target="blank">Concent 2021</a>
    <a href="https://github.com/concentjs/concent" target="blank">
      <GithubOutlined />
    </a>
  </div>
);

export default Footer;
