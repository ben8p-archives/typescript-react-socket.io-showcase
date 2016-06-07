// possible string values for a swipe event
export type SWIPE = 'DOWN' | 'LEFT' | 'RIGHT' | 'UP';

// interface for the swipe constant
interface Swipe {
    DOWN: SWIPE;
    LEFT: SWIPE;
    RIGHT: SWIPE;
    UP: SWIPE;
}

// interface for the optional argument of the swipe method
export interface SwipeOptions {
    threshold: number; // required min distance traveled to be considered swipe
    restraint: number; // maximum distance allowed at the same time in perpendicular direction
    allowedTime: number; // maximum time allowed to travel that distance
}

// All swipe values in an object for easy use
export const SWIPE_VALUES: Swipe = {DOWN: 'DOWN', LEFT: 'LEFT', RIGHT: 'RIGHT', UP: 'UP'};

/** this event listener will react on swipe events, and will execute the given callback when a swipe is detected on the given element */
export function swipe(element: HTMLElement, callback: (direction: SWIPE, event: TouchEvent) => void, options?: SwipeOptions): () => void {
    let startX: number;
    let startY: number;
    let threshold: number = options && options.threshold || 150; // see interace for details
    let restraint: number =  options && options.restraint || 100; // see interace for details
    let allowedTime: number =  options && options.allowedTime || 300; // see interace for details
    let startTime: number;

    function touchStarListener(event: TouchEvent): void {
        let touchedElement: Touch = event.changedTouches[0];
        // record the coordinates of the touch event
        startX = touchedElement.pageX;
        startY = touchedElement.pageY;
        // record the initial touch time to ensure the swipe wasn't during too long
        startTime = new Date().getTime();
    };
    function touchEndListener(event: TouchEvent): void {
        let touchedElement: Touch = event.changedTouches[0];
        // get distance traveled by the finger while in contact with the element
        let distanceX: number = touchedElement.pageX - startX;
        let distanceY: number = touchedElement.pageY - startY;
        // get time elapsed
        let elapsedTime: number = new Date().getTime() - startTime;
        let swipeDirection: SWIPE;
        // if the swipe wasn't during too long...
        if (elapsedTime <= allowedTime) {
            // is it horizontal swipe ?
            if (Math.abs(distanceX) >= threshold && Math.abs(distanceY) <= restraint) {
                // if distanceX is negative it is a left swipe
                swipeDirection = (distanceX < 0) ? SWIPE_VALUES.LEFT : SWIPE_VALUES.RIGHT;
            // is it vertical swipe ?
            } else if (Math.abs(distanceY) >= threshold && Math.abs(distanceX) <= restraint) {
                // if distanceY is negative it is a up swipe
                swipeDirection = (distanceY < 0) ? SWIPE_VALUES.UP : SWIPE_VALUES.DOWN;
            }
            // we have a swipe! fire the callback
            callback(swipeDirection, event);
        }
    }

    // attach the listeners
    element.addEventListener('touchstart', touchStarListener, false);
    element.addEventListener('touchend', touchEndListener, false);

    // return a method allowing to detach the listeners (to avoid memory leaks)
    return function(): void {
        element.removeEventListener('touchstart', touchStarListener);
        element.removeEventListener('touchend', touchEndListener);
    };
}
