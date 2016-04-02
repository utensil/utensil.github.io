/*!
 * jQuery Github Widgets
 *
 * Copyright 2012, Utensil Song
 * https://github.com/utensil
 * 
 * Released under the MIT licenses.
 * 
 */
!function(a){var t={createCaption:function(t){var e=t,p="https://www.github.com/"+e.login,s=p+"/repositories",i=p+"/followers",r=a("div.github-widget"),n=a('<div class="github-widget-caption"/>'),d=a('<div class="github-widget-stat"/>'),l=a('<span class="github-widget-avatar" />'),o=a("<a />").attr("href",p),c=a("<img />");c.attr("title",e.login),c.attr("alt",e.login),c.attr("src",e.avatar_url),o.append(c);var u=a('<span class="github-widget-repos-count" />'),g=a("<a />").attr("href",s),h=a("<strong />").text(e.public_repos),w=a("<span> public repos</span>"),f=a('<span class="github-widget-followers-count" />'),v=a("<a />").attr("href",i),x=a("<strong />").text(e.followers),b=a("<span> followers</span>");g.append(h).append(w),v.append(x).append(b),r.append(n.append(d.append(l.append(o)).append(u.append(g)).append(f.append(v))))},createReposList:function(t){var e=t;e=e.reverse();var p=a("div.github-widget"),s=a('<ul class="github-widget-repos-list"/>');for(var i in e){var r=e[i],n=a("<li />"),d=a("<a />").text(r.name).attr("href",r.html_url),l=a("<h3 />").append(d);r.fork&&l.addClass("fork-flag");var o=a('<ul class="repo-stats" />'),c=a('<li class="language"/>').text(r.language||""),u=a('<a class="watchers" />').text(r.watchers).attr("href",r.html_url+"/watchers"),g=a("<li />").append(u),h=a('<a class="forks" />').text(r.forks).attr("href",r.html_url+"/network"),w=a("<li />").append(h);o.append(c).append(g).append(w);var f=a('<div class="body" />'),v=a('<p class="description" />').text(r.description),x=a('<p class="updated-at" />').text("Last updated: "+r.updated_at.replace("T"," ").replace("Z"," "));f.append(v).append(x),n.append(o).append(l).append(f),s.append(n)}p.append(s)}};a.fn.github_widget=function(e){var p={width:"95%","max-width":"450px",align:"center"},e=a.extend(p,e),s=a("<div></div>").addClass("github-widget");return s.css({width:e.width,"max-width":e["max-width"],"margin-left":"left"==e.align?"5px":"auto","margin-right":"right"==e.align?"5px":"auto"}),this.append(s),a.ajax("https://api.github.com/users/"+e.user,{type:"get",dataType:"jsonp",crossDomain:!0,success:function(p){t.createCaption(p.data),a.ajax("https://api.github.com/users/"+e.user+"/repos",{type:"get",dataType:"jsonp",crossDomain:!0,success:function(a){t.createReposList(a.data)}})}}),this}}(jQuery);