export default class SocketService {
  /**
  *单例模式 
  */
  static instance = null
  static get Instance() {
    if(!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  } 

  //和服务器端连接socket对象
  ws = null

  //定义连接服务器方法
  connet () {
    //连接服务器
    if(!window.WebSocket) {
      return console.log('你的浏览器不支持websocket')
    }
    this.ws = new WebSocket('ws://localhost:8080')

    //连接成功事件
    this.ws.onopen = ()=>{
      ws.send('Hello Server!');
      console.log('连接服务器成功')
    }
    //连接服务器失败
    this.ws.onclose = ()=>{
      console.log('连接服务器失败!')
    }
    //得到服务器发送过来的数据
    this.ws.onmessage = (msg)=>{
      console.log('接受数据')
      console.log(msg.data)

    }
  }
}