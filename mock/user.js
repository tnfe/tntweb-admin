/**
 *  todoList mock 数据入口文件
*/

const { reply } = require('./__helper__');
const Mock = require('mockjs');

let list = [
  {
    "id": 1,
    "displayName": "国内的用户1",
    "comment": "",
    "modifyUser": "zker",
    "owner": "zker",
    "updatedTime": "2021-01-29T06:48:03.000Z",
  },
  {
    "id": 2,
    "displayName": "国内的用户2",
    "comment": "",
    "modifyUser": "zker",
    "owner": "zker",
    "updatedTime": "2021-01-29T06:48:03.000Z",
  },
  {
    "id": 3,
    "displayName": "国内的用户3",
    "comment": "",
    "modifyUser": "zker",
    "owner": "zker",
    "updatedTime": "2021-01-29T06:48:03.000Z",
  },
];

module.exports = {
  'GET /api/user/list': reply(() => list),
}
