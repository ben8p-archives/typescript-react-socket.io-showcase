import * as React from 'react';
import { Chat } from './Chat';
import { Photo } from './Photo';
import { Settings } from './Settings';

import './styles/TabContainer.less';

/** fired when the value of the input width is changed */
interface State {
    selectedTab: string;
}

export class TabContainer extends React.Component<{}, {}> {
    public state: State;
    private mainNode: HTMLDivElement;

    constructor() {
        super();
        this.state = this.getInitialState();

    }

    public getInitialState(): State {
        // default selected tab is chat
        return {
            selectedTab: 'chat'
        };
    }

    public render(): JSX.Element {
        return (
            <div className='tabContainer' data-selected-tab={this.state.selectedTab} ref={(ref: HTMLDivElement) => this.mainNode = ref}>
                <ul onClick={this.onTabClick.bind(this)} className='tabs'>
                    <li data-tab-ref='chat'>Chat</li>
                    <li data-tab-ref='photo'>Photo</li>
                    <li data-tab-ref='settings'>Settings</li>
                </ul>
                <div className='tabContent chatContent'>
                    <Chat/>
                </div>
                <div className='tabContent photoContent'>
                    <Photo/>
                </div>
                <div className='tabContent settingsContent'>
                    <Settings/>
                </div>
            </div>
        );
    }

    /** fired when user click on a tab (event delegation) */
    private onTabClick(event: MouseEvent): void {
        let target: HTMLElement = event.target as HTMLElement;
        let tabRef: string = target.getAttribute('data-tab-ref');
        if (tabRef) {
            // in case we have a ref, we selected the proper tab
            this.setState({selectedTab: tabRef});
        }
    }

}
