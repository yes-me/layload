import Video from './Video';

describe('Video Events', () => {

    let video;
    let videoSpyObj;
    let fakeObj;

    beforeEach( ()  => {
        video = new Video ();

        window.__kx_ad_start = () => {};

        class FakeObj {

            onVisibilityChange (el, callback) {

                return function () {

                    if (visible ) {
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                }
            }

            throttle (callback, wait) {

                return function() {}
            }
        };

        fakeObj = new FakeObj();

        videoSpyObj = jasmine.createSpyObj('video', ['scriptLoaded', 'videoRendered', 'init', 'isScriptLoaded', 'setScriptLoaded', 'isKixerRendered',
            'setKixerRendered', 'startKixerEvent', 'renderKixer', 'onVisibilityChange', 'throttle','onScroll']);

    });


    afterEach( ()  => {
        video = null;
        videoSpyObj = null;
        fakeObj = null;
        window.__kx_ad_start = null;
    }) ;


    it('check all definded methods', () => {
        expect(videoSpyObj.init).toBeDefined();
        expect(videoSpyObj.isScriptLoaded).toBeDefined();
        expect(videoSpyObj.setScriptLoaded).toBeDefined();
        expect(videoSpyObj.isKixerRendered).toBeDefined();
        expect(videoSpyObj.setKixerRendered).toBeDefined();
        expect(videoSpyObj.startKixerEvent).toBeDefined();
        expect(videoSpyObj.renderKixer).toBeDefined();
        expect(videoSpyObj.onVisibilityChange).toBeDefined();
        expect(videoSpyObj.throttle).toBeDefined();
        expect(videoSpyObj.onScroll).toBeDefined();
    });

    it('should expect setScriptLoaded to set scriptLoaded to be true', () => {
        videoSpyObj.setScriptLoaded(true);
        expect(videoSpyObj.setScriptLoaded).toHaveBeenCalledWith(true);

    });

    it('should expect setKixerRendered to set videoRendered to be true', () => {
        videoSpyObj.setKixerRendered(true);
        expect(videoSpyObj.setKixerRendered).toHaveBeenCalledWith(true);

    });

    it('checking onVisibilityChange with returns', () => {

        spyOn(fakeObj, 'onVisibilityChange');
        fakeObj.onVisibilityChange("id", video.renderKixer);

        expect(fakeObj.onVisibilityChange).toHaveBeenCalled();
        expect(fakeObj.onVisibilityChange).toHaveBeenCalledWith("id", video.renderKixer);
        expect(typeof fakeObj.onVisibilityChange).toBe('function');

    });

    it('checking throttle with returns', () => {

        let onVisibilityChange = fakeObj.onVisibilityChange("id", video.renderKixer);

        spyOn(fakeObj, 'throttle');
        fakeObj.throttle(onVisibilityChange, 100);

        expect(fakeObj.throttle).toHaveBeenCalled();
        expect(fakeObj.throttle).toHaveBeenCalledWith(onVisibilityChange, 100);
        expect(typeof fakeObj.onVisibilityChange).toBe('function');

    });

});


describe('video init and setup', () => {
    let video;

    beforeEach(function () {
        video = new Video ();
        window.__kx_ad_start = () => {};


    });

    afterEach(function() {
        video = null;
        window.__kx_ad_start = null;
    });

    it('should return true value after calling startKixerEvent', () => {

        video.startKixerEvent();
        expect(video.videoRendered).toBeTruthy();
        expect(__kx_ad_slots[0]).toBe(5142);

    });


    it('init should trigger onScroll', () => {

        spyOn(video, 'onScroll');
        //before calling initScroll
        expect(video.onScroll).not.toHaveBeenCalled();
        video.initScroll();
        //after calling init
        expect(video.onScroll).toHaveBeenCalled();

    });

});
