
let scrollEvent = {
    //throttle scrolling event to improve performance
    //throttle scrolling event to improve performance
    throttle: function (callback, wait) {
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
};

export default scrollEvent;
