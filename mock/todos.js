/**
 *  todoList mock 数据入口文件
*/

const { reply } = require('./__helper__');
const Mock = require('mockjs')

// 随机生成代办列表
const {
  todos: randomTodos
} = Mock.mock({
  'todos|5-10': [{
      id: '@id',
      text: '@sentence(3, 5)',
      done: '@boolean'
  }]
})

let todos = [
  { id: 1, text: 'love react', done: true },
  { id: 2, text: 'love concent', done: true },
];
todos = todos.concat(randomTodos);

let nextId = todos.length + 1;

module.exports = {
  'GET /api/todos': reply(() => todos),

  'POST /api/todos': reply((body, query, params) => {
    const { text } = body;
    todos.push({ id: nextId, text, done: false });
    nextId ++; 
    return true;
  }),

  'PUT /api/todos': reply((body, query, params) => {
    const { id, done } = body;
    const target = todos.find(v => v.id == id);
    target.done = done;
    return true;
  }),
  
  'DELETE /api/todos': reply((body, query, params) => {
    const { id } = query;
    const targetIndex = todos.findIndex(v => v.id == id);
    todos.splice(targetIndex, 1);
    return true;
  }),
}
