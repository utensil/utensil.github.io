/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.3
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*
* Changelog
* $Date: 2010-12-12 (Wed, 12 Dec 2010) $
* $version: 1.0.0
* $version: 1.0.1 - removed multibyte comments
*
* $Date: 2011-21-02 (Mon, 21 Feb 2011) $
* $version: 1.1.0   - added allowPageScroll property to allow swiping and scrolling of page
*                   - changed handler signatures so one handler can be used for multiple events
* $Date: 2011-23-02 (Wed, 23 Feb 2011) $
* $version: 1.2.0   - added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
*                   - If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
* $version: 1.2.1   - removed console log!
*
* $version: 1.2.2   - Fixed bug where scope was not preserved in callback methods.
*
* $Date: 2011-28-04 (Thurs, 28 April 2011) $
* $version: 1.2.4   - Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
*
* $Date: 2011-27-09 (Tues, 27 September 2011) $
* $version: 1.2.5   - Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
*
* $Date: 2012-14-05 (Mon, 14 May 2012) $
* $version: 1.2.6   - Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.7   - Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.8   - Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
*
* $Date: 2012-06-06 (Wed, 06 June 2012) $
* $version: 1.3.0   - Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
*
* $Date: 2012-05-06 (Fri, 05 June 2012) $
* $version: 1.3.1   - Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
*
* $Date: 2012-29-07 (Sun, 29 July 2012) $
* $version: 1.3.2   - Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
*           - Added "all" fingers value to the fingers property, so any combinatin of fingers triggers the swipe, allowing event handlers to check the finger count
*
* $Date: 2012-09-08 (Thurs, 9 Aug 2012) $
* $version: 1.3.3   - Code tidy prep for minified version
*
* $Date: 2012-04-10 (wed, 4 Oct 2012) $
* $version: 1.4.0   - Added pinch support, pinchIn and pinchOut
*
* $Date: 2012-11-10 (Thurs, 11 Oct 2012) $
* $version: 1.5.0   - Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
*
* $Date: 2012-22-10 (Mon, 22 Oct 2012) $
* $version: 1.5.1   - Fixed bug with jQuery 1.8 and trailing comma in excludedElements
*                   - Fixed bug with IE and eventPreventDefault()
* $Date: 2013-01-12 (Fri, 12 Jan 2013) $
* $version: 1.6.0   - Fixed bugs with pinching, mainly when both pinch and swipe enabled, as well as adding time threshold for multifinger gestures, so releasing one finger beofre the other doesnt trigger as single finger gesture.
*                   - made the demo site all static local HTML pages so they can be run locally by a developer
*                   - added jsDoc comments and added documentation for the plugin   
*                   - code tidy
*                   - added triggerOnTouchLeave property that will end the event when the user swipes off the element.
* $Date: 2013-03-23 (Sat, 23 Mar 2013) $
* $version: 1.6.1   - Added support for ie8 touch events
* $version: 1.6.2   - Added support for events binding with on / off / bind in jQ for all callback names.
*                   - Deprecated the 'click' handler in favour of tap.
*                   - added cancelThreshold property
*                   - added option method to update init options at runtime
*
* $version 1.6.3    - added doubletap, longtap events and longTapThreshold, doubleTapThreshold property
* $Date: 2013-04-04 (Thurs, 04 April 2013) $
* $version 1.6.4    - Fixed bug with cancelThreshold introduced in 1.6.3, where swipe status no longer fired start event, and stopped once swiping back.
*/
!function(n){"use strict";function t(t){return!t||void 0!==t.allowPageScroll||void 0===t.swipe&&void 0===t.swipeStatus||(t.allowPageScroll=c),void 0!==t.click&&void 0===t.tap&&(t.tap=t.click),t||(t={}),t=n.extend({},n.fn.swipe.defaults,t),this.each(function(){var r=n(this),i=r.data(m);i||(i=new e(this,t),r.data(m,i))})}function e(t,e){function L(t){if(!(an()||n(t.target).closest(e.excludedElements,Wn).length>0)){var r,i=t.originalEvent?t.originalEvent:t,u=y?i.touches[0]:i;return qn=S,y?Fn=i.touches.length:t.preventDefault(),Nn=0,Un=null,Yn=null,Hn=0,_n=0,jn=0,Qn=1,Xn=0,Vn=fn(),Cn=wn(),on(),!y||Fn===e.fingers||e.fingers===T||Y()?(sn(0,u),zn=mn(),2==Fn&&(sn(1,i.touches[1]),_n=jn=bn(Vn[0].start,Vn[1].start)),(e.swipeStatus||e.pinchStatus)&&(r=I(i,qn))):r=!1,r===!1?(qn=x,I(i,qn),r):void cn(!0)}}function M(n){var t=n.originalEvent?n.originalEvent:n;if(qn!==O&&qn!==x&&!ln()){var r,i=y?t.touches[0]:t,u=hn(i);if(Gn=mn(),y&&(Fn=t.touches.length),qn=E,2==Fn&&(0==_n?(sn(1,t.touches[1]),_n=jn=bn(Vn[0].start,Vn[1].start)):(hn(t.touches[1]),jn=bn(Vn[0].end,Vn[1].end),Yn=En(Vn[0].end,Vn[1].end)),Qn=Sn(_n,jn),Xn=Math.abs(_n-jn)),Fn===e.fingers||e.fingers===T||!y||Y()){if(Un=yn(u.start,u.end),Q(n,Un),Nn=On(u.start,u.end),Hn=Tn(),gn(Un,Nn),(e.swipeStatus||e.pinchStatus)&&(r=I(t,qn)),!e.triggerOnTouchEnd||e.triggerOnTouchLeave){var o=!0;if(e.triggerOnTouchLeave){var l=Ln(this);o=Mn(u.end,l)}!e.triggerOnTouchEnd&&o?qn=A(E):e.triggerOnTouchLeave&&!o&&(qn=A(O)),(qn==x||qn==O)&&I(t,qn)}}else qn=x,I(t,qn);r===!1&&(qn=x,I(t,qn))}}function D(n){var t=n.originalEvent;return y&&t.touches.length>0?(un(),!0):(ln()&&(Fn=Bn),n.preventDefault(),Gn=mn(),Hn=Tn(),H()?(qn=x,I(t,qn)):e.triggerOnTouchEnd||0==e.triggerOnTouchEnd&&qn===E?(qn=O,I(t,qn)):!e.triggerOnTouchEnd&&G()?(qn=O,N(t,qn,f)):qn===E&&(qn=x,I(t,qn)),void cn(!1))}function P(){Fn=0,Gn=0,zn=0,_n=0,jn=0,Qn=1,on(),cn(!1)}function R(n){var t=n.originalEvent;e.triggerOnTouchLeave&&(qn=A(O),I(t,qn))}function k(){Wn.unbind(Pn,L),Wn.unbind(In,P),Wn.unbind(Rn,M),Wn.unbind(kn,D),An&&Wn.unbind(An,R),cn(!1)}function A(n){var t=n,r=j(),i=U(),u=H();return!r||u?t=x:!i||n!=E||e.triggerOnTouchEnd&&!e.triggerOnTouchLeave?!i&&n==O&&e.triggerOnTouchLeave&&(t=x):t=O,t}function I(n,t){var e=void 0;return F()||q()?e=N(n,t,h):(C()||Y())&&e!==!1&&(e=N(n,t,p)),en()&&e!==!1?e=N(n,t,g):rn()&&e!==!1?e=N(n,t,d):tn()&&e!==!1&&(e=N(n,t,f)),t===x&&P(n),t===O&&(y?0==n.touches.length&&P(n):P(n)),e}function N(t,c,s){var w=void 0;if(s==h){if(Wn.trigger("swipeStatus",[c,Un||null,Nn||0,Hn||0,Fn]),e.swipeStatus&&(w=e.swipeStatus.call(Wn,t,c,Un||null,Nn||0,Hn||0,Fn),w===!1))return!1;if(c==O&&W()){if(Wn.trigger("swipe",[Un,Nn,Hn,Fn]),e.swipe&&(w=e.swipe.call(Wn,t,Un,Nn,Hn,Fn),w===!1))return!1;switch(Un){case r:Wn.trigger("swipeLeft",[Un,Nn,Hn,Fn]),e.swipeLeft&&(w=e.swipeLeft.call(Wn,t,Un,Nn,Hn,Fn));break;case i:Wn.trigger("swipeRight",[Un,Nn,Hn,Fn]),e.swipeRight&&(w=e.swipeRight.call(Wn,t,Un,Nn,Hn,Fn));break;case u:Wn.trigger("swipeUp",[Un,Nn,Hn,Fn]),e.swipeUp&&(w=e.swipeUp.call(Wn,t,Un,Nn,Hn,Fn));break;case o:Wn.trigger("swipeDown",[Un,Nn,Hn,Fn]),e.swipeDown&&(w=e.swipeDown.call(Wn,t,Un,Nn,Hn,Fn))}}}if(s==p){if(Wn.trigger("pinchStatus",[c,Yn||null,Xn||0,Hn||0,Fn,Qn]),e.pinchStatus&&(w=e.pinchStatus.call(Wn,t,c,Yn||null,Xn||0,Hn||0,Fn,Qn),w===!1))return!1;if(c==O&&X())switch(Yn){case l:Wn.trigger("pinchIn",[Yn||null,Xn||0,Hn||0,Fn,Qn]),e.pinchIn&&(w=e.pinchIn.call(Wn,t,Yn||null,Xn||0,Hn||0,Fn,Qn));break;case a:Wn.trigger("pinchOut",[Yn||null,Xn||0,Hn||0,Fn,Qn]),e.pinchOut&&(w=e.pinchOut.call(Wn,t,Yn||null,Xn||0,Hn||0,Fn,Qn))}}return s==f?(c===x||c===O)&&(clearTimeout(Kn),Z()&&!K()?(Jn=mn(),Kn=setTimeout(n.proxy(function(){Jn=null,Wn.trigger("tap",[t.target]),e.tap&&(w=e.tap.call(Wn,t,t.target))},this),e.doubleTapThreshold)):(Jn=null,Wn.trigger("tap",[t.target]),e.tap&&(w=e.tap.call(Wn,t,t.target)))):s==g?(c===x||c===O)&&(clearTimeout(Kn),Jn=null,Wn.trigger("doubletap",[t.target]),e.doubleTap&&(w=e.doubleTap.call(Wn,t,t.target))):s==d&&(c===x||c===O)&&(clearTimeout(Kn),Jn=null,Wn.trigger("longtap",[t.target]),e.longTap&&(w=e.longTap.call(Wn,t,t.target))),w}function U(){var n=!0;return null!==e.threshold&&(n=Nn>=e.threshold),n}function H(){var n=!1;return null!==e.cancelThreshold&&null!==Un&&(n=dn(Un)-Nn>=e.cancelThreshold),n}function _(){return null!==e.pinchThreshold?Xn>=e.pinchThreshold:!0}function j(){var n;return n=e.maxTimeThreshold&&Hn>=e.maxTimeThreshold?!1:!0}function Q(n,t){if(e.allowPageScroll===c||Y())n.preventDefault();else{var l=e.allowPageScroll===s;switch(t){case r:(e.swipeLeft&&l||!l&&e.allowPageScroll!=w)&&n.preventDefault();break;case i:(e.swipeRight&&l||!l&&e.allowPageScroll!=w)&&n.preventDefault();break;case u:(e.swipeUp&&l||!l&&e.allowPageScroll!=v)&&n.preventDefault();break;case o:(e.swipeDown&&l||!l&&e.allowPageScroll!=v)&&n.preventDefault()}}}function X(){var n=V(),t=z(),e=_();return n&&t&&e}function Y(){return!!(e.pinchStatus||e.pinchIn||e.pinchOut)}function C(){return!(!X()||!Y())}function W(){var n=j(),t=U(),e=V(),r=z(),i=H(),u=!i&&r&&e&&t&&n;return u}function q(){return!!(e.swipe||e.swipeStatus||e.swipeLeft||e.swipeRight||e.swipeUp||e.swipeDown)}function F(){return!(!W()||!q())}function V(){return Fn===e.fingers||e.fingers===T||!y}function z(){return 0!==Vn[0].end.x}function G(){return!!e.tap}function Z(){return!!e.doubleTap}function B(){return!!e.longTap}function J(){if(null==Jn)return!1;var n=mn();return Z()&&n-Jn<=e.doubleTapThreshold}function K(){return J()}function $(){return(1===Fn||!y)&&(isNaN(Nn)||0===Nn)}function nn(){return Hn>e.longTapThreshold&&b>Nn}function tn(){return!(!$()||!G())}function en(){return!(!J()||!Z())}function rn(){return!(!nn()||!B())}function un(){Zn=mn(),Bn=event.touches.length+1}function on(){Zn=0,Bn=0}function ln(){var n=!1;if(Zn){var t=mn()-Zn;t<=e.fingerReleaseThreshold&&(n=!0)}return n}function an(){return!(Wn.data(m+"_intouch")!==!0)}function cn(n){n===!0?(Wn.bind(Rn,M),Wn.bind(kn,D),An&&Wn.bind(An,R)):(Wn.unbind(Rn,M,!1),Wn.unbind(kn,D,!1),An&&Wn.unbind(An,R,!1)),Wn.data(m+"_intouch",n===!0)}function sn(n,t){var e=void 0!==t.identifier?t.identifier:0;return Vn[n].identifier=e,Vn[n].start.x=Vn[n].end.x=t.pageX||t.clientX,Vn[n].start.y=Vn[n].end.y=t.pageY||t.clientY,Vn[n]}function hn(n){var t=void 0!==n.identifier?n.identifier:0,e=pn(t);return e.end.x=n.pageX||n.clientX,e.end.y=n.pageY||n.clientY,e}function pn(n){for(var t=0;t<Vn.length;t++)if(Vn[t].identifier==n)return Vn[t]}function fn(){for(var n=[],t=0;5>=t;t++)n.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0});return n}function gn(n,t){t=Math.max(t,dn(n)),Cn[n].distance=t}function dn(n){return Cn[n].distance}function wn(){var n={};return n[r]=vn(r),n[i]=vn(i),n[u]=vn(u),n[o]=vn(o),n}function vn(n){return{direction:n,distance:0}}function Tn(){return Gn-zn}function bn(n,t){var e=Math.abs(n.x-t.x),r=Math.abs(n.y-t.y);return Math.round(Math.sqrt(e*e+r*r))}function Sn(n,t){var e=t/n*1;return e.toFixed(2)}function En(){return 1>Qn?a:l}function On(n,t){return Math.round(Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)))}function xn(n,t){var e=n.x-t.x,r=t.y-n.y,i=Math.atan2(r,e),u=Math.round(180*i/Math.PI);return 0>u&&(u=360-Math.abs(u)),u}function yn(n,t){var e=xn(n,t);return 45>=e&&e>=0?r:360>=e&&e>=315?r:e>=135&&225>=e?i:e>45&&135>e?o:u}function mn(){var n=new Date;return n.getTime()}function Ln(t){t=n(t);var e=t.offset(),r={left:e.left,right:e.left+t.outerWidth(),top:e.top,bottom:e.top+t.outerHeight()};return r}function Mn(n,t){return n.x>t.left&&n.x<t.right&&n.y>t.top&&n.y<t.bottom}var Dn=y||!e.fallbackToMouseEvents,Pn=Dn?"touchstart":"mousedown",Rn=Dn?"touchmove":"mousemove",kn=Dn?"touchend":"mouseup",An=Dn?null:"mouseleave",In="touchcancel",Nn=0,Un=null,Hn=0,_n=0,jn=0,Qn=1,Xn=0,Yn=0,Cn=null,Wn=n(t),qn="start",Fn=0,Vn=null,zn=0,Gn=0,Zn=0,Bn=0,Jn=0,Kn=null;try{Wn.bind(Pn,L),Wn.bind(In,P)}catch($n){n.error("events not supported "+Pn+","+In+" on jQuery.swipe")}this.enable=function(){return Wn.bind(Pn,L),Wn.bind(In,P),Wn},this.disable=function(){return k(),Wn},this.destroy=function(){return k(),Wn.data(m,null),Wn},this.option=function(t,r){if(void 0!==e[t]){if(void 0===r)return e[t];e[t]=r}else n.error("Option "+t+" does not exist on jQuery.swipe.options")}}var r="left",i="right",u="up",o="down",l="in",a="out",c="none",s="auto",h="swipe",p="pinch",f="tap",g="doubletap",d="longtap",w="horizontal",v="vertical",T="all",b=10,S="start",E="move",O="end",x="cancel",y="ontouchstart"in window,m="TouchSwipe",L={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"button, input, select, textarea, a, .noSwipe"};n.fn.swipe=function(e){var r=n(this),i=r.data(m);if(i&&"string"==typeof e){if(i[e])return i[e].apply(this,Array.prototype.slice.call(arguments,1));n.error("Method "+e+" does not exist on jQuery.swipe")}else if(!(i||"object"!=typeof e&&e))return t.apply(this,arguments);return r},n.fn.swipe.defaults=L,n.fn.swipe.phases={PHASE_START:S,PHASE_MOVE:E,PHASE_END:O,PHASE_CANCEL:x},n.fn.swipe.directions={LEFT:r,RIGHT:i,UP:u,DOWN:o,IN:l,OUT:a},n.fn.swipe.pageScroll={NONE:c,HORIZONTAL:w,VERTICAL:v,AUTO:s},n.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:T}}(jQuery);