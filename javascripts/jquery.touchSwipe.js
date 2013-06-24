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
/**
 * See (http://jquery.com/).
 * @name $
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */
/**
 * See (http://jquery.com/)
 * @name fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */
(function(e){"use strict";function N(t){return t&&t.allowPageScroll===undefined&&(t.swipe!==undefined||t.swipeStatus!==undefined)&&(t.allowPageScroll=u),t.click!==undefined&&t.tap===undefined&&(t.tap=t.click),t||(t={}),t=e.extend({},e.fn.swipe.defaults,t),this.each(function(){var n=e(this),r=n.data(x);r||(r=new C(this,t),n.data(x,r))})}function C(T,N){function Z(t){if(Pt())return;if(e(t.target).closest(N.excludedElements,R).length>0)return;var n=t.originalEvent?t.originalEvent:t,r,i=S?n.touches[0]:n;U=y,S?z=n.touches.length:t.preventDefault(),_=0,D=null,I=null,P=0,H=0,B=0,j=1,F=0,W=It(),q=Ut(),_t();if(!S||z===N.fingers||N.fingers===m||dt()){Bt(0,i),X=Gt(),z==2&&(Bt(1,n.touches[1]),H=B=Xt(W[0].start,W[1].start));if(N.swipeStatus||N.pinchStatus)r=ot(n,U)}else r=!1;if(r===!1)return U=E,ot(n,U),r;Ht(!0)}function et(e){var t=e.originalEvent?e.originalEvent:e;if(U===w||U===E||Dt())return;var n,r=S?t.touches[0]:t,i=jt(r);V=Gt(),S&&(z=t.touches.length),U=b,z==2&&(H==0?(Bt(1,t.touches[1]),H=B=Xt(W[0].start,W[1].start)):(jt(t.touches[1]),B=Xt(W[0].end,W[1].end),I=$t(W[0].end,W[1].end)),j=Vt(H,B),F=Math.abs(H-B));if(z===N.fingers||N.fingers===m||!S||dt()){D=Qt(i.start,i.end),ht(e,D),_=Jt(i.start,i.end),P=Wt(),qt(D,_);if(N.swipeStatus||N.pinchStatus)n=ot(t,U);if(!N.triggerOnTouchEnd||N.triggerOnTouchLeave){var s=!0;if(N.triggerOnTouchLeave){var o=Yt(this);s=Zt(i.end,o)}!N.triggerOnTouchEnd&&s?U=st(b):N.triggerOnTouchLeave&&!s&&(U=st(w)),(U==E||U==w)&&ot(t,U)}}else U=E,ot(t,U);n===!1&&(U=E,ot(t,U))}function tt(e){var t=e.originalEvent;if(S&&t.touches.length>0)return Mt(),!0;Dt()&&(z=K),e.preventDefault(),V=Gt(),P=Wt(),ft()?(U=E,ot(t,U)):N.triggerOnTouchEnd||N.triggerOnTouchEnd==0&&U===b?(U=w,ot(t,U)):!N.triggerOnTouchEnd&&Et()?(U=w,ut(t,U,c)):U===b&&(U=E,ot(t,U)),Ht(!1)}function nt(){z=0,V=0,X=0,H=0,B=0,j=1,_t(),Ht(!1)}function rt(e){var t=e.originalEvent;N.triggerOnTouchLeave&&(U=st(w),ot(t,U))}function it(){R.unbind(k,Z),R.unbind(M,nt),R.unbind(L,et),R.unbind(A,tt),O&&R.unbind(O,rt),Ht(!1)}function st(e){var t=e,n=ct(),r=at(),i=ft();return!n||i?t=E:r&&e==b&&(!N.triggerOnTouchEnd||N.triggerOnTouchLeave)?t=w:!r&&e==w&&N.triggerOnTouchLeave&&(t=E),t}function ot(e,t){var n=undefined;return yt()||gt()?n=ut(e,t,f):(vt()||dt())&&n!==!1&&(n=ut(e,t,l)),At()&&n!==!1?n=ut(e,t,h):Ot()&&n!==!1?n=ut(e,t,p):Lt()&&n!==!1&&(n=ut(e,t,c)),t===E&&nt(e),t===w&&(S?e.touches.length==0&&nt(e):nt(e)),n}function ut(u,a,d){var v=undefined;if(d==f){R.trigger("swipeStatus",[a,D||null,_||0,P||0,z]);if(N.swipeStatus){v=N.swipeStatus.call(R,u,a,D||null,_||0,P||0,z);if(v===!1)return!1}if(a==w&&mt()){R.trigger("swipe",[D,_,P,z]);if(N.swipe){v=N.swipe.call(R,u,D,_,P,z);if(v===!1)return!1}switch(D){case t:R.trigger("swipeLeft",[D,_,P,z]),N.swipeLeft&&(v=N.swipeLeft.call(R,u,D,_,P,z));break;case n:R.trigger("swipeRight",[D,_,P,z]),N.swipeRight&&(v=N.swipeRight.call(R,u,D,_,P,z));break;case r:R.trigger("swipeUp",[D,_,P,z]),N.swipeUp&&(v=N.swipeUp.call(R,u,D,_,P,z));break;case i:R.trigger("swipeDown",[D,_,P,z]),N.swipeDown&&(v=N.swipeDown.call(R,u,D,_,P,z))}}}if(d==l){R.trigger("pinchStatus",[a,I||null,F||0,P||0,z,j]);if(N.pinchStatus){v=N.pinchStatus.call(R,u,a,I||null,F||0,P||0,z,j);if(v===!1)return!1}if(a==w&&pt())switch(I){case s:R.trigger("pinchIn",[I||null,F||0,P||0,z,j]),N.pinchIn&&(v=N.pinchIn.call(R,u,I||null,F||0,P||0,z,j));break;case o:R.trigger("pinchOut",[I||null,F||0,P||0,z,j]),N.pinchOut&&(v=N.pinchOut.call(R,u,I||null,F||0,P||0,z,j))}}if(d==c){if(a===E||a===w)clearTimeout(G),St()&&!Nt()?(Q=Gt(),G=setTimeout(e.proxy(function(){Q=null,R.trigger("tap",[u.target]),N.tap&&(v=N.tap.call(R,u,u.target))},this),N.doubleTapThreshold)):(Q=null,R.trigger("tap",[u.target]),N.tap&&(v=N.tap.call(R,u,u.target)))}else if(d==h){if(a===E||a===w)clearTimeout(G),Q=null,R.trigger("doubletap",[u.target]),N.doubleTap&&(v=N.doubleTap.call(R,u,u.target))}else d==p&&(a===E||a===w)&&(clearTimeout(G),Q=null,R.trigger("longtap",[u.target]),N.longTap&&(v=N.longTap.call(R,u,u.target)));return v}function at(){var e=!0;return N.threshold!==null&&(e=_>=N.threshold),e}function ft(){var e=!1;return N.cancelThreshold!==null&&D!==null&&(e=Rt(D)-_>=N.cancelThreshold),e}function lt(){return N.pinchThreshold!==null?F>=N.pinchThreshold:!0}function ct(){var e;return N.maxTimeThreshold?P>=N.maxTimeThreshold?e=!1:e=!0:e=!0,e}function ht(e,s){if(N.allowPageScroll===u||dt())e.preventDefault();else{var o=N.allowPageScroll===a;switch(s){case t:(N.swipeLeft&&o||!o&&N.allowPageScroll!=d)&&e.preventDefault();break;case n:(N.swipeRight&&o||!o&&N.allowPageScroll!=d)&&e.preventDefault();break;case r:(N.swipeUp&&o||!o&&N.allowPageScroll!=v)&&e.preventDefault();break;case i:(N.swipeDown&&o||!o&&N.allowPageScroll!=v)&&e.preventDefault()}}}function pt(){var e=bt(),t=wt(),n=lt();return e&&t&&n}function dt(){return!!(N.pinchStatus||N.pinchIn||N.pinchOut)}function vt(){return!!pt()&&!!dt()}function mt(){var e=ct(),t=at(),n=bt(),r=wt(),i=ft(),s=!i&&r&&n&&t&&e;return s}function gt(){return!!(N.swipe||N.swipeStatus||N.swipeLeft||N.swipeRight||N.swipeUp||N.swipeDown)}function yt(){return!!mt()&&!!gt()}function bt(){return z===N.fingers||N.fingers===m||!S}function wt(){return W[0].end.x!==0}function Et(){return!!N.tap}function St(){return!!N.doubleTap}function xt(){return!!N.longTap}function Tt(){if(Q==null)return!1;var e=Gt();return St()&&e-Q<=N.doubleTapThreshold}function Nt(){return Tt()}function Ct(){return(z===1||!S)&&(isNaN(_)||_===0)}function kt(){return P>N.longTapThreshold&&_<g}function Lt(){return!!Ct()&&!!Et()}function At(){return!!Tt()&&!!St()}function Ot(){return!!kt()&&!!xt()}function Mt(){J=Gt(),K=event.touches.length+1}function _t(){J=0,K=0}function Dt(){var e=!1;if(J){var t=Gt()-J;t<=N.fingerReleaseThreshold&&(e=!0)}return e}function Pt(){return R.data(x+"_intouch")===!0}function Ht(e){e===!0?(R.bind(L,et),R.bind(A,tt),O&&R.bind(O,rt)):(R.unbind(L,et,!1),R.unbind(A,tt,!1),O&&R.unbind(O,rt,!1)),R.data(x+"_intouch",e===!0)}function Bt(e,t){var n=t.identifier!==undefined?t.identifier:0;return W[e].identifier=n,W[e].start.x=W[e].end.x=t.pageX||t.clientX,W[e].start.y=W[e].end.y=t.pageY||t.clientY,W[e]}function jt(e){var t=e.identifier!==undefined?e.identifier:0,n=Ft(t);return n.end.x=e.pageX||e.clientX,n.end.y=e.pageY||e.clientY,n}function Ft(e){for(var t=0;t<W.length;t++)if(W[t].identifier==e)return W[t]}function It(){var e=[];for(var t=0;t<=5;t++)e.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0});return e}function qt(e,t){t=Math.max(t,Rt(e)),q[e].distance=t}function Rt(e){return q[e].distance}function Ut(){var e={};return e[t]=zt(t),e[n]=zt(n),e[r]=zt(r),e[i]=zt(i),e}function zt(e){return{direction:e,distance:0}}function Wt(){return V-X}function Xt(e,t){var n=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return Math.round(Math.sqrt(n*n+r*r))}function Vt(e,t){var n=t/e*1;return n.toFixed(2)}function $t(){return j<1?o:s}function Jt(e,t){return Math.round(Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)))}function Kt(e,t){var n=e.x-t.x,r=t.y-e.y,i=Math.atan2(r,n),s=Math.round(i*180/Math.PI);return s<0&&(s=360-Math.abs(s)),s}function Qt(e,s){var o=Kt(e,s);return o<=45&&o>=0?t:o<=360&&o>=315?t:o>=135&&o<=225?n:o>45&&o<135?i:r}function Gt(){var e=new Date;return e.getTime()}function Yt(t){t=e(t);var n=t.offset(),r={left:n.left,right:n.left+t.outerWidth(),top:n.top,bottom:n.top+t.outerHeight()};return r}function Zt(e,t){return e.x>t.left&&e.x<t.right&&e.y>t.top&&e.y<t.bottom}var C=S||!N.fallbackToMouseEvents,k=C?"touchstart":"mousedown",L=C?"touchmove":"mousemove",A=C?"touchend":"mouseup",O=C?null:"mouseleave",M="touchcancel",_=0,D=null,P=0,H=0,B=0,j=1,F=0,I=0,q=null,R=e(T),U="start",z=0,W=null,X=0,V=0,J=0,K=0,Q=0,G=null;try{R.bind(k,Z),R.bind(M,nt)}catch(Y){e.error("events not supported "+k+","+M+" on jQuery.swipe")}this.enable=function(){return R.bind(k,Z),R.bind(M,nt),R},this.disable=function(){return it(),R},this.destroy=function(){return it(),R.data(x,null),R},this.option=function(t,n){if(N[t]!==undefined){if(n===undefined)return N[t];N[t]=n}else e.error("Option "+t+" does not exist on jQuery.swipe.options")}}var t="left",n="right",r="up",i="down",s="in",o="out",u="none",a="auto",f="swipe",l="pinch",c="tap",h="doubletap",p="longtap",d="horizontal",v="vertical",m="all",g=10,y="start",b="move",w="end",E="cancel",S="ontouchstart"in window,x="TouchSwipe",T={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(t){var n=e(this),r=n.data(x);if(r&&typeof t=="string"){if(r[t])return r[t].apply(this,Array.prototype.slice.call(arguments,1));e.error("Method "+t+" does not exist on jQuery.swipe")}else if(!r&&(typeof t=="object"||!t))return N.apply(this,arguments);return n},e.fn.swipe.defaults=T,e.fn.swipe.phases={PHASE_START:y,PHASE_MOVE:b,PHASE_END:w,PHASE_CANCEL:E},e.fn.swipe.directions={LEFT:t,RIGHT:n,UP:r,DOWN:i,IN:s,OUT:o},e.fn.swipe.pageScroll={NONE:u,HORIZONTAL:d,VERTICAL:v,AUTO:a},e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:m}})(jQuery);