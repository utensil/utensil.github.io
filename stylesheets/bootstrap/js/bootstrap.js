/* ===================================================
 * bootstrap-transition.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){t(function(){"use strict";t.support.transition=function(){var e=document.body||document.documentElement,i=e.style,n=void 0!==i.transition||void 0!==i.WebkitTransition||void 0!==i.MozTransition||void 0!==i.MsTransition||void 0!==i.OTransition;return n&&{end:function(){var e="TransitionEnd";return t.browser.webkit?e="webkitTransitionEnd":t.browser.mozilla?e="transitionend":t.browser.opera&&(e="oTransitionEnd"),e}()}}()})}(window.jQuery),/* ==========================================================
 * bootstrap-alert.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e='[data-dismiss="alert"]',i=function(i){t(i).on("click",e,this.close)};i.prototype={constructor:i,close:function(e){function i(){n.trigger("closed").remove()}var n,s=t(this),o=s.attr("data-target");o||(o=s.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),n=t(o),n.trigger("close"),e&&e.preventDefault(),n.length||(n=s.hasClass("alert")?s:s.parent()),n.trigger("close").removeClass("in"),t.support.transition&&n.hasClass("fade")?n.on(t.support.transition.end,i):i()}},t.fn.alert=function(e){return this.each(function(){var n=t(this),s=n.data("alert");s||n.data("alert",s=new i(this)),"string"==typeof e&&s[e].call(n)})},t.fn.alert.Constructor=i,t(function(){t("body").on("click.alert.data-api",e,i.prototype.close)})}(window.jQuery),/* ============================================================
 * bootstrap-button.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.options=t.extend({},t.fn.button.defaults,i)};e.prototype={constructor:e,setState:function(t){var e="disabled",i=this.$element,n=i.data(),s=i.is("input")?"val":"html";t+="Text",n.resetText||i.data("resetText",i[s]()),i[s](n[t]||this.options[t]),setTimeout(function(){"loadingText"==t?i.addClass(e).attr(e,e):i.removeClass(e).removeAttr(e)},0)},toggle:function(){var t=this.$element.parent('[data-toggle="buttons-radio"]');t&&t.find(".active").removeClass("active"),this.$element.toggleClass("active")}},t.fn.button=function(i){return this.each(function(){var n=t(this),s=n.data("button"),o="object"==typeof i&&i;s||n.data("button",s=new e(this,o)),"toggle"==i?s.toggle():i&&s.setState(i)})},t.fn.button.defaults={loadingText:"loading..."},t.fn.button.Constructor=e,t(function(){t("body").on("click.button.data-api","[data-toggle^=button]",function(e){var i=t(e.target);i.hasClass("btn")||(i=i.closest(".btn")),i.button("toggle")})})}(window.jQuery),/* ==========================================================
 * bootstrap-carousel.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.options=t.extend({},t.fn.carousel.defaults,i),this.options.slide&&this.slide(this.options.slide)};e.prototype={cycle:function(){return this.interval=setInterval(t.proxy(this.next,this),this.options.interval),this},to:function(e){var i=this.$element.find(".active"),n=i.parent().children(),s=n.index(i),o=this;if(!(e>n.length-1||0>e))return this.sliding?this.$element.one("slid",function(){o.to(e)}):s==e?this.pause().cycle():this.slide(e>s?"next":"prev",t(n[e]))},pause:function(){return clearInterval(this.interval),this.interval=null,this},next:function(){return this.sliding?void 0:this.slide("next")},prev:function(){return this.sliding?void 0:this.slide("prev")},slide:function(e,i){var n=this.$element.find(".active"),s=i||n[e](),o=this.interval,a="next"==e?"left":"right",r="next"==e?"first":"last",l=this;if(s.length)return this.sliding=!0,o&&this.pause(),s=s.length?s:this.$element.find(".item")[r](),!t.support.transition&&this.$element.hasClass("slide")?(this.$element.trigger("slide"),n.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger("slid")):(s.addClass(e),s[0].offsetWidth,n.addClass(a),s.addClass(a),this.$element.trigger("slide"),this.$element.one(t.support.transition.end,function(){s.removeClass([e,a].join(" ")).addClass("active"),n.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger("slid")},0)})),o&&this.cycle(),this}},t.fn.carousel=function(i){return this.each(function(){var n=t(this),s=n.data("carousel"),o="object"==typeof i&&i;s||n.data("carousel",s=new e(this,o)),"number"==typeof i?s.to(i):"string"==typeof i||(i=o.slide)?s[i]():s.cycle()})},t.fn.carousel.defaults={interval:5e3},t.fn.carousel.Constructor=e,t(function(){t("body").on("click.carousel.data-api","[data-slide]",function(e){var i,n=t(this),s=t(n.attr("data-target")||(i=n.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),o=!s.data("modal")&&t.extend({},s.data(),n.data());s.carousel(o),e.preventDefault()})})}(window.jQuery),/* =============================================================
 * bootstrap-collapse.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.options=t.extend({},t.fn.collapse.defaults,i),this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};e.prototype={constructor:e,dimension:function(){var t=this.$element.hasClass("width");return t?"width":"height"},show:function(){var e,i=this.dimension(),n=t.camelCase(["scroll",i].join("-")),s=this.$parent&&this.$parent.find(".in");s&&s.length&&(e=s.data("collapse"),s.collapse("hide"),e||s.data("collapse",null)),this.$element[i](0),this.transition("addClass","show","shown"),this.$element[i](this.$element[0][n])},hide:function(){var t=this.dimension();this.reset(this.$element[t]()),this.transition("removeClass","hide","hidden"),this.$element[t](0)},reset:function(t){var e=this.dimension();this.$element.removeClass("collapse")[e](t||"auto")[0].offsetWidth,this.$element.addClass("collapse")},transition:function(e,i,n){var s=this,o=function(){"show"==i&&s.reset(),s.$element.trigger(n)};this.$element.trigger(i)[e]("in"),t.support.transition&&this.$element.hasClass("collapse")?this.$element.one(t.support.transition.end,o):o()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},t.fn.collapse=function(i){return this.each(function(){var n=t(this),s=n.data("collapse"),o="object"==typeof i&&i;s||n.data("collapse",s=new e(this,o)),"string"==typeof i&&s[i]()})},t.fn.collapse.defaults={toggle:!0},t.fn.collapse.Constructor=e,t(function(){t("body").on("click.collapse.data-api","[data-toggle=collapse]",function(e){var i,n=t(this),s=n.attr("data-target")||e.preventDefault()||(i=n.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""),o=t(s).data("collapse")?"toggle":n.data();t(s).collapse(o)})})}(window.jQuery),/* ============================================================
 * bootstrap-dropdown.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";function e(){t(i).parent().removeClass("open")}var i='[data-toggle="dropdown"]',n=function(e){var i=t(e).on("click.dropdown.data-api",this.toggle);t("html").on("click.dropdown.data-api",function(){i.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(){var i,n,s=t(this),o=s.attr("data-target");return o||(o=s.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),i=t(o),i.length||(i=s.parent()),n=i.hasClass("open"),e(),!n&&i.toggleClass("open"),!1}},t.fn.dropdown=function(e){return this.each(function(){var i=t(this),s=i.data("dropdown");s||i.data("dropdown",s=new n(this)),"string"==typeof e&&s[e].call(i)})},t.fn.dropdown.Constructor=n,t(function(){t("html").on("click.dropdown.data-api",e),t("body").on("click.dropdown.data-api",i,n.prototype.toggle)})}(window.jQuery),/* =========================================================
 * bootstrap-modal.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(t){"use strict";function e(){var e=this,n=setTimeout(function(){e.$element.off(t.support.transition.end),i.call(e)},500);this.$element.one(t.support.transition.end,function(){clearTimeout(n),i.call(e)})}function i(){this.$element.hide().trigger("hidden"),n.call(this)}function n(e){var i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&i;this.$backdrop=t('<div class="modal-backdrop '+i+'" />').appendTo(document.body),"static"!=this.options.backdrop&&this.$backdrop.click(t.proxy(this.hide,this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),n?this.$backdrop.one(t.support.transition.end,e):e()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(t.support.transition.end,t.proxy(s,this)):s.call(this)):e&&e()}function s(){this.$backdrop.remove(),this.$backdrop=null}function o(){var e=this;this.isShown&&this.options.keyboard?t(document).on("keyup.dismiss.modal",function(t){27==t.which&&e.hide()}):this.isShown||t(document).off("keyup.dismiss.modal")}var a=function(e,i){this.options=i,this.$element=t(e).delegate('[data-dismiss="modal"]',"click.dismiss.modal",t.proxy(this.hide,this))};a.prototype={constructor:a,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var e=this;this.isShown||(t("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),o.call(this),n.call(this,function(){var i=t.support.transition&&e.$element.hasClass("fade");!e.$element.parent().length&&e.$element.appendTo(document.body),e.$element.show(),i&&e.$element[0].offsetWidth,e.$element.addClass("in"),i?e.$element.one(t.support.transition.end,function(){e.$element.trigger("shown")}):e.$element.trigger("shown")}))},hide:function(n){n&&n.preventDefault(),this.isShown&&(this.isShown=!1,t("body").removeClass("modal-open"),o.call(this),this.$element.trigger("hide").removeClass("in"),t.support.transition&&this.$element.hasClass("fade")?e.call(this):i.call(this))}},t.fn.modal=function(e){return this.each(function(){var i=t(this),n=i.data("modal"),s=t.extend({},t.fn.modal.defaults,i.data(),"object"==typeof e&&e);n||i.data("modal",n=new a(this,s)),"string"==typeof e?n[e]():s.show&&n.show()})},t.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},t.fn.modal.Constructor=a,t(function(){t("body").on("click.modal.data-api",'[data-toggle="modal"]',function(e){var i,n=t(this),s=t(n.attr("data-target")||(i=n.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),o=s.data("modal")?"toggle":t.extend({},s.data(),n.data());e.preventDefault(),s.modal(o)})})}(window.jQuery),/* ===========================================================
 * bootstrap-tooltip.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e=function(t,e){this.init("tooltip",t,e)};e.prototype={constructor:e,init:function(e,i,n){var s,o;this.type=e,this.$element=t(i),this.options=this.getOptions(n),this.enabled=!0,"manual"!=this.options.trigger&&(s="hover"==this.options.trigger?"mouseenter":"focus",o="hover"==this.options.trigger?"mouseleave":"blur",this.$element.on(s,this.options.selector,t.proxy(this.enter,this)),this.$element.on(o,this.options.selector,t.proxy(this.leave,this))),this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(e){return e=t.extend({},t.fn[this.type].defaults,e,this.$element.data()),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},enter:function(e){var i=t(e.currentTarget)[this.type](this._options).data(this.type);i.options.delay&&i.options.delay.show?(i.hoverState="in",setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show()},leave:function(e){var i=t(e.currentTarget)[this.type](this._options).data(this.type);i.options.delay&&i.options.delay.hide?(i.hoverState="out",setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide()},show:function(){var t,e,i,n,s,o,a;if(this.hasContent()&&this.enabled){switch(t=this.tip(),this.setContent(),this.options.animation&&t.addClass("fade"),o="function"==typeof this.options.placement?this.options.placement.call(this,t[0],this.$element[0]):this.options.placement,e=/in/.test(o),t.remove().css({top:0,left:0,display:"block"}).appendTo(e?this.$element:document.body),i=this.getPosition(e),n=t[0].offsetWidth,s=t[0].offsetHeight,e?o.split(" ")[1]:o){case"bottom":a={top:i.top+i.height,left:i.left+i.width/2-n/2};break;case"top":a={top:i.top-s,left:i.left+i.width/2-n/2};break;case"left":a={top:i.top+i.height/2-s/2,left:i.left-n};break;case"right":a={top:i.top+i.height/2-s/2,left:i.left+i.width}}t.css(a).addClass(o).addClass("in")}},setContent:function(){var t=this.tip();t.find(".tooltip-inner").html(this.getTitle()),t.removeClass("fade in top bottom left right")},hide:function(){function e(){var e=setTimeout(function(){i.off(t.support.transition.end).remove()},500);i.one(t.support.transition.end,function(){clearTimeout(e),i.remove()})}var i=this.tip();i.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?e():i.remove()},fixTitle:function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(e){return t.extend({},e?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title),t=t.toString().replace(/(^\s*|\s*$)/,"")},tip:function(){return this.$tip=this.$tip||t(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},t.fn.tooltip=function(i){return this.each(function(){var n=t(this),s=n.data("tooltip"),o="object"==typeof i&&i;s||n.data("tooltip",s=new e(this,o)),"string"==typeof i&&s[i]()})},t.fn.tooltip.Constructor=e,t.fn.tooltip.defaults={animation:!0,delay:0,selector:!1,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery),/* ===========================================================
 * bootstrap-popover.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
!function(t){"use strict";var e=function(t,e){this.init("popover",t,e)};e.prototype=t.extend({},t.fn.tooltip.Constructor.prototype,{constructor:e,setContent:function(){var e=this.tip(),i=this.getTitle(),n=this.getContent();e.find(".popover-title")["object"==t.type(i)?"append":"html"](i),e.find(".popover-content > *")["object"==t.type(n)?"append":"html"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var t,e=this.$element,i=this.options;return t=e.attr("data-content")||("function"==typeof i.content?i.content.call(e[0]):i.content),t=t.toString().replace(/(^\s*|\s*$)/,"")},tip:function(){return this.$tip||(this.$tip=t(this.options.template)),this.$tip}}),t.fn.popover=function(i){return this.each(function(){var n=t(this),s=n.data("popover"),o="object"==typeof i&&i;s||n.data("popover",s=new e(this,o)),"string"==typeof i&&s[i]()})},t.fn.popover.Constructor=e,t.fn.popover.defaults=t.extend({},t.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),/* =============================================================
 * bootstrap-scrollspy.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */
!function(t){"use strict";function e(e,i){var n,s=t.proxy(this.process,this),o=t(e).is("body")?t(window):t(e);this.options=t.extend({},t.fn.scrollspy.defaults,i),this.$scrollElement=o.on("scroll.scroll.data-api",s),this.selector=(this.options.target||(n=t(e).attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=t("body").on("click.scroll.data-api",this.selector,s),this.refresh(),this.process()}e.prototype={constructor:e,refresh:function(){this.targets=this.$body.find(this.selector).map(function(){var e=t(this).attr("href");return/^#\w/.test(e)&&t(e).length?e:null}),this.offsets=t.map(this.targets,function(e){return t(e).position().top})},process:function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.offsets,n=this.targets,s=this.activeTarget;for(t=i.length;t--;)s!=n[t]&&e>=i[t]&&(!i[t+1]||e<=i[t+1])&&this.activate(n[t])},activate:function(t){var e;this.activeTarget=t,this.$body.find(this.selector).parent(".active").removeClass("active"),e=this.$body.find(this.selector+'[href="'+t+'"]').parent("li").addClass("active"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active")}},t.fn.scrollspy=function(i){return this.each(function(){var n=t(this),s=n.data("scrollspy"),o="object"==typeof i&&i;s||n.data("scrollspy",s=new e(this,o)),"string"==typeof i&&s[i]()})},t.fn.scrollspy.Constructor=e,t.fn.scrollspy.defaults={offset:10},t(function(){t('[data-spy="scroll"]').each(function(){var e=t(this);e.scrollspy(e.data())})})}(window.jQuery),/* ========================================================
 * bootstrap-tab.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */
!function(t){"use strict";var e=function(e){this.element=t(e)};e.prototype={constructor:e,show:function(){var e,i,n=this.element,s=n.closest("ul:not(.dropdown-menu)"),o=n.attr("data-target");o||(o=n.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),n.parent("li").hasClass("active")||(e=s.find(".active a").last()[0],n.trigger({type:"show",relatedTarget:e}),i=t(o),this.activate(n.parent("li"),s),this.activate(i,i.parent(),function(){n.trigger({type:"shown",relatedTarget:e})}))},activate:function(e,i,n){function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),e.addClass("active"),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"),n&&n()}var o=i.find("> .active"),a=n&&t.support.transition&&o.hasClass("fade");a?o.one(t.support.transition.end,s):s(),o.removeClass("in")}},t.fn.tab=function(i){return this.each(function(){var n=t(this),s=n.data("tab");s||n.data("tab",s=new e(this)),"string"==typeof i&&s[i]()})},t.fn.tab.Constructor=e,t(function(){t("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault(),t(this).tab("show")})})}(window.jQuery),/* =============================================================
 * bootstrap-typeahead.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.options=t.extend({},t.fn.typeahead.defaults,i),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.$menu=t(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};e.prototype={constructor:e,select:function(){var t=this.$menu.find(".active").attr("data-value");return this.$element.val(t),this.hide()},show:function(){var e=t.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:e.top+e.height,left:e.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(){var e,i=this;return this.query=this.$element.val(),this.query?(e=t.grep(this.source,function(t){return i.matcher(t)?t:void 0}),e=this.sorter(e),e.length?this.render(e.slice(0,this.options.items)).show():this.shown?this.hide():this):this.shown?this.hide():this},matcher:function(t){return~t.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(t){for(var e,i=[],n=[],s=[];e=t.shift();)e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?n.push(e):s.push(e):i.push(e);return i.concat(n,s)},highlighter:function(t){return t.replace(new RegExp("("+this.query+")","ig"),function(t,e){return"<strong>"+e+"</strong>"})},render:function(e){var i=this;return e=t(e).map(function(e,n){return e=t(i.options.item).attr("data-value",n),e.find("a").html(i.highlighter(n)),e[0]}),e.first().addClass("active"),this.$menu.html(e),this},next:function(){var e=this.$menu.find(".active").removeClass("active"),i=e.next();i.length||(i=t(this.$menu.find("li")[0])),i.addClass("active")},prev:function(){var t=this.$menu.find(".active").removeClass("active"),e=t.prev();e.length||(e=this.$menu.find("li").last()),e.addClass("active")},listen:function(){this.$element.on("blur",t.proxy(this.blur,this)).on("keypress",t.proxy(this.keypress,this)).on("keyup",t.proxy(this.keyup,this)),(t.browser.webkit||t.browser.msie)&&this.$element.on("keydown",t.proxy(this.keypress,this)),this.$menu.on("click",t.proxy(this.click,this)).on("mouseenter","li",t.proxy(this.mouseenter,this))},keyup:function(t){switch(t.stopPropagation(),t.preventDefault(),t.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:this.hide();break;default:this.lookup()}},keypress:function(t){if(t.stopPropagation(),this.shown)switch(t.keyCode){case 9:case 13:case 27:t.preventDefault();break;case 38:t.preventDefault(),this.prev();break;case 40:t.preventDefault(),this.next()}},blur:function(t){var e=this;t.stopPropagation(),t.preventDefault(),setTimeout(function(){e.hide()},150)},click:function(t){t.stopPropagation(),t.preventDefault(),this.select()},mouseenter:function(e){this.$menu.find(".active").removeClass("active"),t(e.currentTarget).addClass("active")}},t.fn.typeahead=function(i){return this.each(function(){var n=t(this),s=n.data("typeahead"),o="object"==typeof i&&i;s||n.data("typeahead",s=new e(this,o)),"string"==typeof i&&s[i]()})},t.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>'},t.fn.typeahead.Constructor=e,t(function(){t("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(e){var i=t(this);i.data("typeahead")||(e.preventDefault(),i.typeahead(i.data()))})})}(window.jQuery);