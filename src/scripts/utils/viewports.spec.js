import Viewports from './Viewports';


describe('Viewports', () => {

    let viewports;
    let elm = {};


    beforeEach( ()  => {
        viewports = new Viewports ({
            'mobile': 685,
            'tablet': 686,
            'desktop': 992
        });
        elm = document.createElement('div');
        elm.style.height='800px';
        elm.innerHTML = "dummy text";
    });


    afterEach( ()  => {
        viewports = null;
        elm = null;
    }) ;


    it("should return the right viewport device when checking viewports", () => {

        viewports.setWinW( 400);
		let chkViewPort = viewports.getViewPort();
		expect (chkViewPort).toBe('mobile');

        viewports.setWinW( 800);
        chkViewPort = viewports.getViewPort();
		expect (chkViewPort).toBe('tablet');

        viewports.winW = 1010;
        chkViewPort = viewports.getViewPort();
		expect (chkViewPort).toBe('desktop');
	});

    //should return null since we are testing on desktop
    it('should return not isIPad', () => {
        let isIPad =  viewports.isIPad();
        expect(isIPad).toBe(null);
    });

    //should return null since we are testing on desktop
    it('should return not isMobile', () => {
        let isMobile =  viewports.isMobile();
        expect(isMobile).toBe(null);
    });

    //should return null since we are testing on desktop
    it('should return not isTouch', () => {
        let isTouch =  viewports.isTouch();
        expect(isTouch).toBe(null);
    });

    it('should check if Elmement is InViewport', () => {
        //elm.getBoundingClientRect() will return top:0, left:0, bottom:0 and right:0
        //the elm will be in view when calling viewports.isElmInViewport(elm)
        expect(viewports.isElmInViewport(elm)).toBeTruthy();
    });


    it('should check if the top position of the Elmement is passing a set point', () => {
        //set window height
        viewports.setWinH( 400);
        //set the offset -500 to test falsy
        expect(viewports.isElmTopPosPassing(elm, -500)).toBeFalsy();
        //set the offset 100 to test truthy
        expect(viewports.isElmTopPosPassing(elm, 100)).toBeTruthy();

    });

});


