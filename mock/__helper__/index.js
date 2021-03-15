/**
 * 辅助函数，用于可以动态操作mock接口请求和响应数据
 */

exports.reply = (cb) => {
  return (req, res) => {
    console.debug(` ------>>> ${req.method} ${req.url}`);
    const data = cb(req.body, req.query, req.params);
    const toSend = Math.random() > 0.1 ? { code: 0, data, msg: 'success' } : { code: 1, msg: '业务逻辑异常' };
    res.send(toSend);
  }
}