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
!function(n){"use strict";function t(t){return!t||void 0!==t.allowPageScroll||void 0===t.swipe&&void 0===t.swipeStatus||(t.allowPageScroll=c),void 0!==t.click&&void 0===t.tap&&(t.tap=t.click),t||(t={}),t=n.extend({},n.fn.swipe.defaults,t),this.each(function(){var r=n(this),i=r.data(m);i||(i=new e(this,t),r.data(m,i))})}function e(t,e){function L(t){if(!(lt()||n(t.target).closest(e.excludedElements,Ct).length>0)){var r,i=t.originalEvent?t.originalEvent:t,u=y?i.touches[0]:i;return Wt=S,y?qt=i.touches.length:t.preventDefault(),It=0,Nt=null,Xt=null,Ut=0,Ht=0,_t=0,jt=1,Qt=0,Ft=pt(),Yt=dt(),ut(),!y||qt===e.fingers||e.fingers===T||Y()?(ct(0,u),Vt=yt(),2==qt&&(ct(1,i.touches[1]),Ht=_t=Tt(Ft[0].start,Ft[1].start)),(e.swipeStatus||e.pinchStatus)&&(r=I(i,Wt))):r=!1,r===!1?(Wt=x,I(i,Wt),r):(at(!0),void 0)}}function M(n){var t=n.originalEvent?n.originalEvent:n;if(Wt!==O&&Wt!==x&&!ot()){var r,i=y?t.touches[0]:t,u=st(i);if(zt=yt(),y&&(qt=t.touches.length),Wt=E,2==qt&&(0==Ht?(ct(1,t.touches[1]),Ht=_t=Tt(Ft[0].start,Ft[1].start)):(st(t.touches[1]),_t=Tt(Ft[0].end,Ft[1].end),Xt=St(Ft[0].end,Ft[1].end)),jt=bt(Ht,_t),Qt=Math.abs(Ht-_t)),qt===e.fingers||e.fingers===T||!y||Y()){if(Nt=xt(u.start,u.end),Q(n,Nt),It=Et(u.start,u.end),Ut=vt(),ft(Nt,It),(e.swipeStatus||e.pinchStatus)&&(r=I(t,Wt)),!e.triggerOnTouchEnd||e.triggerOnTouchLeave){var o=!0;if(e.triggerOnTouchLeave){var l=mt(this);o=Lt(u.end,l)}!e.triggerOnTouchEnd&&o?Wt=A(E):e.triggerOnTouchLeave&&!o&&(Wt=A(O)),(Wt==x||Wt==O)&&I(t,Wt)}}else Wt=x,I(t,Wt);r===!1&&(Wt=x,I(t,Wt))}}function D(n){var t=n.originalEvent;return y&&t.touches.length>0?(it(),!0):(ot()&&(qt=Zt),n.preventDefault(),zt=yt(),Ut=vt(),H()?(Wt=x,I(t,Wt)):e.triggerOnTouchEnd||0==e.triggerOnTouchEnd&&Wt===E?(Wt=O,I(t,Wt)):!e.triggerOnTouchEnd&&G()?(Wt=O,N(t,Wt,f)):Wt===E&&(Wt=x,I(t,Wt)),at(!1),void 0)}function P(){qt=0,zt=0,Vt=0,Ht=0,_t=0,jt=1,ut(),at(!1)}function R(n){var t=n.originalEvent;e.triggerOnTouchLeave&&(Wt=A(O),I(t,Wt))}function k(){Ct.unbind(Dt,L),Ct.unbind(At,P),Ct.unbind(Pt,M),Ct.unbind(Rt,D),kt&&Ct.unbind(kt,R),at(!1)}function A(n){var t=n,r=j(),i=U(),u=H();return!r||u?t=x:!i||n!=E||e.triggerOnTouchEnd&&!e.triggerOnTouchLeave?!i&&n==O&&e.triggerOnTouchLeave&&(t=x):t=O,t}function I(n,t){var e=void 0;return F()||q()?e=N(n,t,h):(C()||Y())&&e!==!1&&(e=N(n,t,p)),et()&&e!==!1?e=N(n,t,g):rt()&&e!==!1?e=N(n,t,d):tt()&&e!==!1&&(e=N(n,t,f)),t===x&&P(n),t===O&&(y?0==n.touches.length&&P(n):P(n)),e}function N(t,c,s){var w=void 0;if(s==h){if(Ct.trigger("swipeStatus",[c,Nt||null,It||0,Ut||0,qt]),e.swipeStatus&&(w=e.swipeStatus.call(Ct,t,c,Nt||null,It||0,Ut||0,qt),w===!1))return!1;if(c==O&&W()){if(Ct.trigger("swipe",[Nt,It,Ut,qt]),e.swipe&&(w=e.swipe.call(Ct,t,Nt,It,Ut,qt),w===!1))return!1;switch(Nt){case r:Ct.trigger("swipeLeft",[Nt,It,Ut,qt]),e.swipeLeft&&(w=e.swipeLeft.call(Ct,t,Nt,It,Ut,qt));break;case i:Ct.trigger("swipeRight",[Nt,It,Ut,qt]),e.swipeRight&&(w=e.swipeRight.call(Ct,t,Nt,It,Ut,qt));break;case u:Ct.trigger("swipeUp",[Nt,It,Ut,qt]),e.swipeUp&&(w=e.swipeUp.call(Ct,t,Nt,It,Ut,qt));break;case o:Ct.trigger("swipeDown",[Nt,It,Ut,qt]),e.swipeDown&&(w=e.swipeDown.call(Ct,t,Nt,It,Ut,qt))}}}if(s==p){if(Ct.trigger("pinchStatus",[c,Xt||null,Qt||0,Ut||0,qt,jt]),e.pinchStatus&&(w=e.pinchStatus.call(Ct,t,c,Xt||null,Qt||0,Ut||0,qt,jt),w===!1))return!1;if(c==O&&X())switch(Xt){case l:Ct.trigger("pinchIn",[Xt||null,Qt||0,Ut||0,qt,jt]),e.pinchIn&&(w=e.pinchIn.call(Ct,t,Xt||null,Qt||0,Ut||0,qt,jt));break;case a:Ct.trigger("pinchOut",[Xt||null,Qt||0,Ut||0,qt,jt]),e.pinchOut&&(w=e.pinchOut.call(Ct,t,Xt||null,Qt||0,Ut||0,qt,jt))}}return s==f?(c===x||c===O)&&(clearTimeout(Jt),Z()&&!K()?(Bt=yt(),Jt=setTimeout(n.proxy(function(){Bt=null,Ct.trigger("tap",[t.target]),e.tap&&(w=e.tap.call(Ct,t,t.target))},this),e.doubleTapThreshold)):(Bt=null,Ct.trigger("tap",[t.target]),e.tap&&(w=e.tap.call(Ct,t,t.target)))):s==g?(c===x||c===O)&&(clearTimeout(Jt),Bt=null,Ct.trigger("doubletap",[t.target]),e.doubleTap&&(w=e.doubleTap.call(Ct,t,t.target))):s==d&&(c===x||c===O)&&(clearTimeout(Jt),Bt=null,Ct.trigger("longtap",[t.target]),e.longTap&&(w=e.longTap.call(Ct,t,t.target))),w}function U(){var n=!0;return null!==e.threshold&&(n=It>=e.threshold),n}function H(){var n=!1;return null!==e.cancelThreshold&&null!==Nt&&(n=gt(Nt)-It>=e.cancelThreshold),n}function _(){return null!==e.pinchThreshold?Qt>=e.pinchThreshold:!0}function j(){var n;return n=e.maxTimeThreshold?Ut>=e.maxTimeThreshold?!1:!0:!0}function Q(n,t){if(e.allowPageScroll===c||Y())n.preventDefault();else{var l=e.allowPageScroll===s;switch(t){case r:(e.swipeLeft&&l||!l&&e.allowPageScroll!=w)&&n.preventDefault();break;case i:(e.swipeRight&&l||!l&&e.allowPageScroll!=w)&&n.preventDefault();break;case u:(e.swipeUp&&l||!l&&e.allowPageScroll!=v)&&n.preventDefault();break;case o:(e.swipeDown&&l||!l&&e.allowPageScroll!=v)&&n.preventDefault()}}}function X(){var n=V(),t=z(),e=_();return n&&t&&e}function Y(){return!!(e.pinchStatus||e.pinchIn||e.pinchOut)}function C(){return!(!X()||!Y())}function W(){var n=j(),t=U(),e=V(),r=z(),i=H(),u=!i&&r&&e&&t&&n;return u}function q(){return!!(e.swipe||e.swipeStatus||e.swipeLeft||e.swipeRight||e.swipeUp||e.swipeDown)}function F(){return!(!W()||!q())}function V(){return qt===e.fingers||e.fingers===T||!y}function z(){return 0!==Ft[0].end.x}function G(){return!!e.tap}function Z(){return!!e.doubleTap}function B(){return!!e.longTap}function J(){if(null==Bt)return!1;var n=yt();return Z()&&n-Bt<=e.doubleTapThreshold}function K(){return J()}function $(){return!(1!==qt&&y||!isNaN(It)&&0!==It)}function nt(){return Ut>e.longTapThreshold&&b>It}function tt(){return!(!$()||!G())}function et(){return!(!J()||!Z())}function rt(){return!(!nt()||!B())}function it(){Gt=yt(),Zt=event.touches.length+1}function ut(){Gt=0,Zt=0}function ot(){var n=!1;if(Gt){var t=yt()-Gt;t<=e.fingerReleaseThreshold&&(n=!0)}return n}function lt(){return!(Ct.data(m+"_intouch")!==!0)}function at(n){n===!0?(Ct.bind(Pt,M),Ct.bind(Rt,D),kt&&Ct.bind(kt,R)):(Ct.unbind(Pt,M,!1),Ct.unbind(Rt,D,!1),kt&&Ct.unbind(kt,R,!1)),Ct.data(m+"_intouch",n===!0)}function ct(n,t){var e=void 0!==t.identifier?t.identifier:0;return Ft[n].identifier=e,Ft[n].start.x=Ft[n].end.x=t.pageX||t.clientX,Ft[n].start.y=Ft[n].end.y=t.pageY||t.clientY,Ft[n]}function st(n){var t=void 0!==n.identifier?n.identifier:0,e=ht(t);return e.end.x=n.pageX||n.clientX,e.end.y=n.pageY||n.clientY,e}function ht(n){for(var t=0;t<Ft.length;t++)if(Ft[t].identifier==n)return Ft[t]}function pt(){for(var n=[],t=0;5>=t;t++)n.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0});return n}function ft(n,t){t=Math.max(t,gt(n)),Yt[n].distance=t}function gt(n){return Yt[n].distance}function dt(){var n={};return n[r]=wt(r),n[i]=wt(i),n[u]=wt(u),n[o]=wt(o),n}function wt(n){return{direction:n,distance:0}}function vt(){return zt-Vt}function Tt(n,t){var e=Math.abs(n.x-t.x),r=Math.abs(n.y-t.y);return Math.round(Math.sqrt(e*e+r*r))}function bt(n,t){var e=1*(t/n);return e.toFixed(2)}function St(){return 1>jt?a:l}function Et(n,t){return Math.round(Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)))}function Ot(n,t){var e=n.x-t.x,r=t.y-n.y,i=Math.atan2(r,e),u=Math.round(180*i/Math.PI);return 0>u&&(u=360-Math.abs(u)),u}function xt(n,t){var e=Ot(n,t);return 45>=e&&e>=0?r:360>=e&&e>=315?r:e>=135&&225>=e?i:e>45&&135>e?o:u}function yt(){var n=new Date;return n.getTime()}function mt(t){t=n(t);var e=t.offset(),r={left:e.left,right:e.left+t.outerWidth(),top:e.top,bottom:e.top+t.outerHeight()};return r}function Lt(n,t){return n.x>t.left&&n.x<t.right&&n.y>t.top&&n.y<t.bottom}var Mt=y||!e.fallbackToMouseEvents,Dt=Mt?"touchstart":"mousedown",Pt=Mt?"touchmove":"mousemove",Rt=Mt?"touchend":"mouseup",kt=Mt?null:"mouseleave",At="touchcancel",It=0,Nt=null,Ut=0,Ht=0,_t=0,jt=1,Qt=0,Xt=0,Yt=null,Ct=n(t),Wt="start",qt=0,Ft=null,Vt=0,zt=0,Gt=0,Zt=0,Bt=0,Jt=null;try{Ct.bind(Dt,L),Ct.bind(At,P)}catch(Kt){n.error("events not supported "+Dt+","+At+" on jQuery.swipe")}this.enable=function(){return Ct.bind(Dt,L),Ct.bind(At,P),Ct},this.disable=function(){return k(),Ct},this.destroy=function(){return k(),Ct.data(m,null),Ct},this.option=function(t,r){if(void 0!==e[t]){if(void 0===r)return e[t];e[t]=r}else n.error("Option "+t+" does not exist on jQuery.swipe.options")}}var r="left",i="right",u="up",o="down",l="in",a="out",c="none",s="auto",h="swipe",p="pinch",f="tap",g="doubletap",d="longtap",w="horizontal",v="vertical",T="all",b=10,S="start",E="move",O="end",x="cancel",y="ontouchstart"in window,m="TouchSwipe",L={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"button, input, select, textarea, a, .noSwipe"};n.fn.swipe=function(e){var r=n(this),i=r.data(m);if(i&&"string"==typeof e){if(i[e])return i[e].apply(this,Array.prototype.slice.call(arguments,1));n.error("Method "+e+" does not exist on jQuery.swipe")}else if(!(i||"object"!=typeof e&&e))return t.apply(this,arguments);return r},n.fn.swipe.defaults=L,n.fn.swipe.phases={PHASE_START:S,PHASE_MOVE:E,PHASE_END:O,PHASE_CANCEL:x},n.fn.swipe.directions={LEFT:r,RIGHT:i,UP:u,DOWN:o,IN:l,OUT:a},n.fn.swipe.pageScroll={NONE:c,HORIZONTAL:w,VERTICAL:v,AUTO:s},n.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:T}}(jQuery);