import WsMessage from "@/socket/WsMessage";
import {WssEventListener, WssHandlerDict} from "@/types/types";

export default class TSocket {
  private port = 8080;
  private url = 'localhost';

  private socket?: WebSocket;

  private WSS_HANDLERS: WssHandlerDict = {};


  constructor() {}

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

      this.socket.onclose = () => {
        this.connect();
      }
    });
  }

  private receive(message: MessageEvent) {

    const msg = new WsMessage(message.data);

    const event = msg.event;
    const data = msg.message;
    const wssHandlers = this.WSS_HANDLERS[event];
    if(wssHandlers !== undefined && wssHandlers.length) {
      wssHandlers.forEach((wssHandler) => {
        this.executeWssHandler(wssHandler, data);
      });
    }
  }

  private executeWssHandler(wsHandler: WssEventListener, message: any) {
    wsHandler(message, this.socket);
  }

  on(event: string, handler: WssEventListener) {
    if(!this.WSS_HANDLERS[event]) {
      this.WSS_HANDLERS[event] = [];
    }
    this.WSS_HANDLERS[event].push(handler);
  }

  clear(event, handler: WssEventListener) {
    if(!this.WSS_HANDLERS[event]) {
      return;
    }
    const index = this.WSS_HANDLERS[event].findIndex(h => h === handler);
    if(index !== -1) {
      delete this.WSS_HANDLERS[event][index];
    }
  }

  emit(event:string, message: any) {
    if(!this.socket) return;

    const messagePack = {
      event: event,
      message: message
    };
    this.socket.send(JSON.stringify(messagePack));
  }
}
