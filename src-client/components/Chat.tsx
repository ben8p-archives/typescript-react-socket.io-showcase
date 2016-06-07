import * as React from 'react';
import * as io from 'socket.io-client';
import {SettingsStore} from '../core/SettingsStore';

import './styles/Chat.less';

// define the content of a state
interface State {
    messages: Message[];
}
// define a message object
interface Message {
    message: string;
    user: string;
}

// some constants
const SERVER_URL: string = 'http://localhost:3000';
const EVENT_NAME: string = 'message';
const ENTER_KEY: number = 13;

export class Chat extends React.Component<{}, {}> {
    public state: State;
    private socket: SocketIOClient.Socket;
    private messageInputNode: HTMLInputElement;
    private messagesContainerNode: HTMLUListElement;

    constructor() {
        super();
        this.state = this.getInitialState();
        // open the socket on the given url
        this.socket = io.connect(SERVER_URL);
        // handle events coming from the socket
        this.socket.on(EVENT_NAME, this.handleMessage.bind(this));
    }

    public getInitialState(): State {
        // initial state has a message to welcome the new user onthe chat
        return {
            messages: [{
                message: 'welcome on the chat',
                user: 'system'
            }]
        };
    }

    public render(): JSX.Element {
        let messages: Message[] = this.state.messages,
            nickname: string = SettingsStore.getNickname();

        return (
            <div className='chat'>
                <ul className='messagesContainer' ref={(ref: HTMLUListElement) => this.messagesContainerNode = ref}>
                {
                    // render all messages in the current state
                    messages.map((message: Message, index: number): JSX.Element => {
                        let mainClass: string = 'clearfix';
                        let arrowCode: number = 9658;
                        if(nickname === message.user) {
                            mainClass += ' myself';
                            arrowCode = 9668;
                        }
                        if(index % 2) {
                            mainClass += ' highlight';
                        }
                        return <li className={mainClass}><span className='nickname'>{message.user}</span><span className='arrow'>{String.fromCharCode(arrowCode)}</span><span className='message'>{message.message}</span></li>;
                    })
                }
                </ul>
                <div className='fieldsContainer'>
                    <input ref={(ref: HTMLInputElement) => this.messageInputNode = ref} onKeyPress={this.onMessageKeyPress.bind(this)}></input>
                    <button onClick={this.onSendClick.bind(this)}>{String.fromCharCode(9658)}</button>
                </div>
            </div>
        );
    }

    /** fired whena message has to be processed */
    private handleMessage(event: Message): void {
        let messages: Message[] = this.state.messages;
        messages.push(event);
        this.setState({messages: messages});
        this.messagesContainerNode.scrollTop = Number.MAX_VALUE;
    }

    /** fired when user press a Key inside the text field */
    private onMessageKeyPress(event: KeyboardEvent): void {
        if (event.charCode === ENTER_KEY || event.keyCode === ENTER_KEY) {
            // if it is ENTER KEY, we act like if user press "send"
            this.sendMessage();
        }
    }

    /** fired when send button is clicked */
    private onSendClick(event: Event): void {
        this.sendMessage();
    }

    /** send a message over the socket */
    private sendMessage(): void {
        if (this.messageInputNode.value) {
            let messageData: Message = { message: this.messageInputNode.value, user: SettingsStore.getNickname() };
            this.handleMessage(messageData);
            this.socket.emit(EVENT_NAME, messageData);
            this.messageInputNode.value = '';
        }
    }
}
