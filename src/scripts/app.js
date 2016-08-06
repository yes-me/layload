import Viewports from './utils/Viewports';
import Video from './video/Video';
import FsLazyLoad from './lazyLoadImages/LazyLoadImg';

let viewports = new Viewports({
    'mobile': 685,
    'tablet': 686,
    'desktop': 992
});
//only start the kixer on mobile device
if(viewports.isMobile()) {
    let video = new Video();
    video.initScroll();
} 
