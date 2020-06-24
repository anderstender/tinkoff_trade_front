export default class WsMessage {
  public event!: string;
  public message!: any;
  constructor(rawMessage: string | WsMessage ) {
    let data: any = null;
    if(rawMessage instanceof WsMessage) {
      data = rawMessage;
    } else {
      data = JSON.parse(rawMessage);
    }

    if(!data.event) {
      throw new Error('no event');
    }
    this.event = data.event;
    this.message = data.message || null;
  }

}