/*
 * video lazy-loads video app on mobile
 */

import Viewports from "../../../src/scripts/utils/Viewports";
import ScriptLoader from "../../../src/scripts/utils/ScriptLoader";
import scrollEvent from "../../../src/scripts/utils/scrollEvent";

class Video {

    constructor () {
        this.videoScript = 'https://www.youtube.com/watch?v=wv6sxLG-eXE';
        this.kxSlot = {'id': 5142, "domId": document.getElementById("__kx_ad_5142")};;
        this.scriptLoaded = false;
        this.videoRendered = false;
    }

    //getter for scriptLoaded
    isScriptLoaded () {
        return this.scriptLoaded;
    }

    //setter for scriptLoaded
    setScriptLoaded (value) {
        this.scriptLoaded = value;
    }

    //getter for videoRendered
    isKixerRendered () {
        return this.videoRendered;
    }

    //setter for videoRendered
    setKixerRendered (value) {
        this.videoRendered = value;
    }

    getKixerScript () {
        return this.videoScript;
    }

    getKixerSlot () {
        return this.kxSlot;
    }

    //start video event
    startKixerEvent () {

        window.__kx_ad_slots = window.__kx_ad_slots || [];  //instruction from Kixer team, __kx_ad_slots needs to be a global object
        __kx_ad_slots.push(this.kxSlot.id);
        if(typeof __kx_ad_start == 'function') {
            __kx_ad_start();
            this.setKixerRendered(true);
        }

    }

    //get Kixer JS and render video widget
    renderKixer () {

        //check if video JS is not loaded to ensure the following block code runs only once
        if (!this.isScriptLoaded()) {
            let scriptLoader = new ScriptLoader();
            //load the script asynchronously
            scriptLoader && scriptLoader.getScript(this.videoScript, this.setScriptLoaded(true), true);

        } else { // If the script is loaded

            // If the ad hasn't rendered and the script is ready
            if(!this.isKixerRendered() && typeof __kx_ad_start == 'function') {
                this.startKixerEvent();  //start video and set video.videoRendered to equal to true
            }
        }
    }

    /**
     * @desc check if el visibility is changed
     * @param dom object el
     * @param function callback
     * @return function, callback is executed if the condition is met
     */
    onVisibilityChange (el, callback) {
        let viewports = new Viewports();
       
        return function () {
            //instead of comparing el top position, we pass a 500px offset so that the video widget will be injected early;
            //otherwise, users will scroll right pass the element and not see the video widget that is being Lazy loading on the page
            let visible = viewports.isElmTopPosPassing(el, 1000);
            if (visible ) {
                if (typeof callback == 'function') {
                    callback();
                }
            }
        }
    }

    //throttle scrolling event to improve performance
    throttle (callback, wait) {
        var time,
            go = true;
        return function() {
            if(go) {
                go = false;
                time = setTimeout(function(){
                    time = null;
                    go = true;
                    callback.call();
                }, wait);
            }
        }
    }

    onScroll (scrollHandler) {
        
        window.addEventListener("scroll", () => {
                scrollHandler();
                let isKixerRendered = this.isKixerRendered();
                //remove the scroll event after Kixer is rendered
                if(isKixerRendered) {
                    this.removeEventListener('scroll', arguments.callee);
                }
        });

    }

    /**
     * @desc init function that runs onScroll event to lazy-load video script and widget
     * OnScroll event will be canceled once video widget is rendered
     * @return undefined
     */
    initScroll () {
        /*
         @scrollHandler returns a handler that runs throttle function. We pass a callback function
         onVisibilityChange and 100ms delay scroll within throttle. onVisibilityChange function checks
         if kxSlot.domId is near the top of window. if kxSlot.domId top position is 500px before the window top
         position, that.renderKixer callback function will run
         */

        let scrollHandler = scrollEvent.throttle(this.onVisibilityChange(this.kxSlot.domId, this.renderKixer.bind(this)), 100);

        this.onScroll(scrollHandler);

    }

}


export default Video;


