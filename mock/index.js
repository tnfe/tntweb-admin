const delay = require('webpack-api-mocker/utils/delay');
const todos = require('./todos');
const user = require('./user')

// 根据环境变量判断是否需要开启代理
const noProxy = process.env.NO_PROXY === 'true';
const proxy = Object.assign({},
  todos,
  user
);

module.exports = (noProxy ? {} : delay(proxy, 600));
