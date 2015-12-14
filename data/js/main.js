/**
 * Created by yeo on 2015-12-14.
 */


function rollingBanner(selector, playSpeed, rollingSpeed, direction) {
    this._$banners - null;
    this._direction = direction;
    this._currentIndex = 0;
    this._timerID = -1;
    this._bannerWidth = 0;
    this._bannerHeight = 0;
    this._playSpeed = playSpeed;
    this._rollingSpeed = rollingSpeed;
    this._init(selector);
    this._initEvent();
}

rollingBanner.prototype._init = function(selector) {
    this._$banners = $(selector).find("img");
}

rollingBanner.prototype._initEvent = function() {
    var objThis = this;
    this._$banners.eq(0).one("load", function() {
        objThis._bannerWidth = $(this).width();
        objThis._bannerHeight =  $(this).height();
        objThis._start();
    })
}

rollingBanner.prototype._start = function() {
    this._initBannerPos();
    this.startAutoPlay();
}

rollingBanner.prototype._initBannerPos = function() {

    if(this._direction == "left") {
        this._$banners.css("left", this._bannerWidth);
        this._$banners.eq(this._currentIndex).css("left", 0);
    } else if(this._direction == "top") {
        this._$banners.css("top", this._bannerHeight);
        this._$banners.eq(this._currentIndex).css("top", 0);
    }

}

rollingBanner.prototype.startAutoPlay = function() {
    var objThis = this;
    if(this._timerID = -1) {
        this._timerID = setInterval(function() {
            objThis.nextBanner();
        }, this._playSpeed);
    }
}

rollingBanner.prototype.nextBanner = function() {
    var $outBanner = this._$banners.eq(this._currentIndex);

    this._currentIndex++;

    if(this._currentIndex >= this._$banners.length) {
        this._initIndex();
    }

    var $inBanner = this._$banners.eq(this._currentIndex);

    if(this._direction == "left") {
        $inBanner.css({
            left: this._bannerWidth,
            opacity: 0
        })

        $outBanner.stop().animate({
            left: -this._bannerWidth,
            opacity: 0
        }, this._rollingSpeed);

        $inBanner.stop().animate({
            left: 0,
            opacity: 1
        }, this._rollingSpeed);
    } else if (this._direction == "top") {
        $inBanner.css({
            top: this._bannerHeight,
            opacity: 0
        })

        $outBanner.stop().animate({
            top: -this._bannerHeight,
            opacity: 0
        }, this._rollingSpeed);

        $inBanner.stop().animate({
            top: 0,
            opacity: 1
        }, this._rollingSpeed);
    }
}


rollingBanner.prototype._initIndex = function() {
    this._currentIndex = 0;
}


/*

function childRoolingBanner(selector, playSpeed, rollingSpeed) {
    this._$rolling = null;
    RollingBanner.call(this, selector, playSpeed, rollingSpeed);
}

childRoolingBanner.prototype._init = function(selector) {
    this._$rolling = $(selector);
    rollingBanner.prototype._init.call(this, selector);
}

childRoolingBanner.prototype = new rollingBanner();
childRoolingBanner.prototype.constructor = childRoolingBanner;


childRoolingBanner.prototype._initEvent = function() {
    rollingBanner.prototype._initEvent.call(this);
    var objThis = this;
    this._$rolling.mouseenter(function() {
        objThis.stopAutoPlay();
    })

    this._$rolling.mouseleave(function() {
        objThis.startAutoPlay();
    })
}

childRoolingBanner.prototype.stopAutoPlay = function() {
    if(this._timerID != -1) {
        clearInterval(this._timerID);
        this._timerID = -1;
    }
}
*/

$(document).ready(function() {
    var rolling1 = new rollingBanner("#banner", 3000, 1000, "left")
})


