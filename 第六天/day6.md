# socket.io

[原生socket的方案](https://github.com/Wscats/workerman)

[npm文档](https://www.npmjs.com/package/socket.io)

[socket.io文档](https://github.com/Wscats/node-tutorial/issues/7)

```js
//发送事件
socket.emit("事件名字","文本消息体（对象，数组，字符串等）");
//监听事件
socket.on('事件名字', function(data) {});
```