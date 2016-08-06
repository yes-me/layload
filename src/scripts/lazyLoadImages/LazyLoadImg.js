

class LazyLoadImg {

    constructor () {
        this.handlr = undefined;
    }

    loadImage (el) {
        let srcset = el.getAttribute('lazy-srcset');
        if (el !== 'undefined') {
            el.setAttribute('srcset', srcset);
            el.removeAttribute("lazy-srcset");
        }
    }

    /**
     * this function checks if the image is in viewport and returns true false accordingly
     * @param el element in question
     * @returns {boolean} true if in viewport, false otherwise
     */
    elementInViewport (el) {
        let rect = el.getBoundingClientRect();
        return (
            rect.top >= 0
            && rect.left >= 0
            && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    }

    /**
     * This function is called on every scroll and it determines if the image is in viewport and if yes, then we load the image
     */
    processScroll () {
        let images = this.getImages();
        let len = images.length;
        for (let i = 0; i < len; i++) {
            if (this.elementInViewport(images[i])) {
                this.loadImage(images[i]);
            }

        }
        if (images.length === 0) {
            this.deinit();
        }


    }

    /**
     * Returns the images as an array set in the page
     * @param that
     * @returns {Array}
     */
    getImages () {
        let qry = document.querySelectorAll('#main img[lazy-srcset]');
        let images = new Array();
        for (let i = 0, l = qry.length; i < l; i++) {
            images.push(qry[i]);
        }
        return images;
    }

    /**q
     * Init function which triggers the load of lazyLoad Script on Document Load.
     */
    init () {
        this.handlr = () => this.processScroll() ;
        window.addEventListener('scroll', this.handlr, false);
        window.addEventListener('load', this.handlr, false);
    }

    /**
     * deInit function which removes all the listeners from the page
     */
    deinit () {
        window.removeEventListener('scroll', this.handlr, false);
        window.removeEventListener('load', this.handlr, false);
    }

}

export default LazyLoadImg;
