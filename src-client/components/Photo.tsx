import * as React from 'react';
import * as on from '../core/on';
import {SettingsStore} from '../core/SettingsStore';
import './styles/Photo.less';

// define the content of a state
interface State {
    index: number;
    showLoader: boolean;
}

// some constants
const WIDTH_TOKEN: string = '{width}';
const HEIGHT_TOKEN: string = '{height}';
const INDEX_TOKEN: string = '{index}';
const SERVER_URL: string = 'http://lorempixel.com/' + WIDTH_TOKEN + '/' + HEIGHT_TOKEN + '/cats/' + INDEX_TOKEN;

export class Photo extends React.Component<{}, {}> {
    public state: State;
    private swipeHandleRemover: Function;
    private mainNode: HTMLDivElement;

    constructor() {
        super();
        this.state = this.getInitialState();
    }

    public getInitialState(): State {
        return {
            index: 1,
            showLoader: true
        };
    }

    public componentDidMount(): void {
        // attach the swipe handler when component is ready
        this.swipeHandleRemover = on.swipe(this.mainNode, this.onSwipe.bind(this));
    }

    public componentWillUnmount(): void {
        // detach the swipe handler to avoid leak
        this.swipeHandleRemover();
    }

    public componentWillReceiveProps(): void {
        this.setState({showLoader: true});
    }

    public render(): JSX.Element {
        let index: number = this.state.index;
        // generate the proper url
        let url: string = SERVER_URL.replace(WIDTH_TOKEN, SettingsStore.getWidth().toString()).replace(HEIGHT_TOKEN, SettingsStore.getHeight().toString()).replace(INDEX_TOKEN, index.toString());
        let previousClass: string = index === 1 ? 'hidden' : 'previousButton';
        let loaderClass: string = this.state.showLoader ? 'loader' : 'hidden';
        let mainStyle: any = {
            height: SettingsStore.getHeight().toString() + 'px',
            width: SettingsStore.getWidth().toString() + 'px'
        };
        return (
            <div style={mainStyle} className='photo' ref={(ref: HTMLDivElement) => this.mainNode = ref}>
                <div className={loaderClass}></div>
                <img src={url} onLoad={this.onImageLoaded.bind(this)} />
                <button className={previousClass} onClick={this.onClickPrevious.bind(this)}>{String.fromCharCode(9668)}</button>
                <button className='nextButton' onClick={this.onClickNext.bind(this)}>{String.fromCharCode(9658)}</button>
            </div>
        );
    }

    /** fired when the image is loaded and displayed */
    private onImageLoaded(event: Event): void {
            this.setState({showLoader: false});
    }

    /** fired when user click on previous button */
    private onClickPrevious(event: Event): void {
        let newIndex: number = this.state.index - 1;
        this.setState({
            index: newIndex || 1,
            showLoader: true
        });
    }

    /** fired when user click on next button */
    private onClickNext(event: Event): void {
        this.setState({
            index: ++this.state.index,
            showLoader: true
        });
    }

    /** fired when user swipe (any direction) */
    private onSwipe(direction: on.SWIPE, event: TouchEvent): void {
        // depending on the swipe, we may simulate a previous click or next click
        if (direction === on.SWIPE_VALUES.LEFT) {
            this.onClickPrevious(event);
        } else if (direction === on.SWIPE_VALUES.RIGHT) {
            this.onClickNext(event);
        }
    }

}
