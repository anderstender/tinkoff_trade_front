type WssEventListener = (data: any, ws?: WebSocket) => void;
type WssHandlerDict = { [key: string]: WssEventListener };

import WsMessage from "@/socket/WsMessage";

export default class TSocket {
  private port = 8080;
  private url = 'localhost';

  private socket?: WebSocket;

  private WSS_HANDLERS: WssHandlerDict = {};


  constructor() {
  }

  connect(): Promise<TSocket> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket('ws://' + this.url + ':' + this.port);
      this.socket.onopen = () => {
        resolve(this);
      };
      this.socket.onerror = error => {
        throw new Error(JSON.stringify(error));
      };
      this.socket.onmessage = (message) => {
        this.receive(message);
      };
    });
  }

  private receive(message: MessageEvent) {
    const msg = new WsMessage(message.data);
    const event = msg.event;
    const data = msg.message;
    const wssHandler = this.WSS_HANDLERS[event];
    if(wssHandler !== undefined) {
      this.executeWssHandler(wssHandler, data);
    }
  }

  private executeWssHandler(wsHandler: WssEventListener, message: any) {
    wsHandler(message, this.socket);
  }

  on(event: string, handler: WssEventListener) {
    this.WSS_HANDLERS[event] = handler;
  }

  emit(event:string , message: any) {
    if(!this.socket) return;

    const messagePack = {
      event: event,
      message: message
    };
    this.socket.send(JSON.stringify(messagePack));
  }
}
