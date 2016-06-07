import * as React from 'react';
import {SettingsStore} from '../core/SettingsStore';

import './styles/Settings.less';

// define the content of a state
interface State {
    chatSettingsExpanded: boolean;
    photoSettingsExpanded: boolean;
}

/** fired when user click onprevious button */
const EXPANDED_CLASS: string = 'expanded';
const COLLAPSED_CLASS: string = 'collapsed';

export class Settings extends React.Component<{}, {}> {
    public state: State;
    private nicknameInputNode: HTMLInputElement;
    private widthInputNode: HTMLInputElement;
    private heightInputNode: HTMLInputElement;
    private chatSettingsNode: HTMLDivElement;
    private photoSettingsNode: HTMLDivElement;

    constructor() {
        super();
        this.state = this.getInitialState();

    }

    public getInitialState(): State {
        // default state is both collapsed
        return {
            chatSettingsExpanded: false,
            photoSettingsExpanded: false
        };
    }

    public render(): JSX.Element {
        let chatSettingsExpandedClass: string = this.state.chatSettingsExpanded ? EXPANDED_CLASS : COLLAPSED_CLASS;
        let photoSettingsExpandedClass: string = this.state.photoSettingsExpanded ? EXPANDED_CLASS : COLLAPSED_CLASS;
        return (
            <div className='settings'>
                <div className={photoSettingsExpandedClass} ref={(ref: HTMLDivElement) => this.photoSettingsNode = ref}>
                    <h1 className='title' onClick={this.onPhotoSettingsHeaderClick.bind(this)}>Photo settings</h1>
                    <div className='content'>
                        <label>width: {SettingsStore.getWidth()}px</label>
                        <input type='range' ref={(ref: HTMLInputElement) => this.widthInputNode = ref} onChange={this.onWidthChange.bind(this)} defaultValue={SettingsStore.getWidth()} max='400' min='100' step='10'></input>
                        <label>height: {SettingsStore.getHeight()}px</label>
                        <input type='range' ref={(ref: HTMLInputElement) => this.heightInputNode = ref} onChange={this.onHeightChange.bind(this)} defaultValue={SettingsStore.getHeight()} max='400' min='100' step='10'></input>
                    </div>
                </div>
                <div className={chatSettingsExpandedClass} ref={(ref: HTMLDivElement) => this.chatSettingsNode = ref}>
                    <h1 className='title' onClick={this.onChatSettingsHeaderClick.bind(this)}>Chat settings</h1>
                    <div className='content'>
                        <label>nickname: </label>
                        <input ref={(ref: HTMLInputElement) => this.nicknameInputNode = ref} onChange={this.onNicknameChange.bind(this)} type='text' defaultValue={SettingsStore.getNickname()} placeholder='enter your nickname'></input>
                    </div>
                </div>
            </div>
        );
    }

    /** fired when Chat settings is clicked */
    private onChatSettingsHeaderClick(): void {
        this.setState({chatSettingsExpanded: !this.state.chatSettingsExpanded});
    }

    /** fired when Photo settings is clicked */
    private onPhotoSettingsHeaderClick(): void {
        this.setState({photoSettingsExpanded: !this.state.photoSettingsExpanded});
    }

    /** fired when the value of the input nickname is changed */
    private onNicknameChange(): void {
        SettingsStore.setNickname(this.nicknameInputNode.value);
    }

    /** fired when the value of the input width is changed */
    private onWidthChange(): void {
        SettingsStore.setWidth(parseInt(this.widthInputNode.value, 10));
        this.forceUpdate();
    }

    /** fired when the value of the input height is changed */
    private onHeightChange(): void {
        SettingsStore.setHeight(parseInt(this.heightInputNode.value, 10));
        this.forceUpdate();
    }

}
