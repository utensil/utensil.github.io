(function($){
  
  var githubview = {
    
    createCaption: function(data) {
      
      var user_info = data;
      
      if(jQuery.browser.msie)
      {
        //TODO IE is not working yet
        //user_info = $.parseJSON(data);
      }
      
      var user_url = 'https://www.github.com/' + user_info.login;
      var user_repos_url = user_url + '/repositories';
      var user_follower_url = user_url +  '/followers';
      
      var view = $('div.githubview');
      
      var view_stat = $('<ul class="githubview-stat"/>');
            
      var view_caption = $('<div class="githubview-caption"/>');
      
      var view_user = $('<li />');
      var view_user_link = $('<a />').attr('href', user_url);     
      var view_avatar = $('<img class="githubview-avatar"/>')
                          .attr('title', user_info.login)
                          .attr('src', user_info.avatar_url);
      view_user_link.append(view_avatar);      
      
      var view_repos = $('<li />');
      var view_repos_link = $('<a />').attr('href', user_repos_url);
      var view_repos_count = $('<strong />').text(user_info.public_repos);
      var view_repos_text = $('<span> public repos</span>');  
      
      
      var view_follow = $('<li />');
      var view_follow_link = $('<a />').attr('href', user_follower_url);
      var view_follow_count = $('<strong />').text(user_info.followers);
      var view_follow_text = $('<span> followers</span>');        
      
      view_repos_link.append(view_repos_count).append(view_repos_text);
      view_follow_link.append(view_follow_count).append(view_follow_text);  
        
      view
        .append(view_caption
          .append(view_stat
            .append(view_user.append(view_user_link))
            .append(view_repos.append(view_repos_link))
            .append(view_follow.append(view_follow_link))
          )
        );
    },
    
    createReposList : function(data){
      
      var repos_info = data;
      
      if(jQuery.browser.msie)
      {
        //TODO IE is not working yet
        //repos_info = $.parseJSON(data);
      }
      
      //latest first
      repos_info = repos_info.reverse();
      
      var view = $('div.githubview');
      
      var view_repos_list = $('<ul class="githubview-repos-list"/>');
      for(var i in repos_info)
      {
        var rep = repos_info[i];
        
        var cur_rep = $('<li />');
        
        var rep_link = $('<a />').text(rep.name).attr('href', rep.html_url);
        
        var rep_name = $('<h3 />').append(rep_link);
        
        if(rep.fork)
        {
          // var fork_info = $('<span class="fork-flag" />');
          // rep_name.prepend(fork_info);
          rep_name.addClass('fork-flag');
        }
        
        var stat = $('<ul class="repo-stats" />');
        var language = $('<li class="language"/>').text(rep.language || '');
        
        var watchers_link = $('<a class="watchers" />').text(rep.watchers).attr('href', rep.html_url + '/watchers');        
        var watchers = $('<li />').append(watchers_link);
        
        var forks_link = $('<a class="forks" />').text(rep.forks).attr('href', rep.html_url + '/network'); 
        var forks = $('<li />').append(forks_link);
        
        stat.append(language).append(watchers).append(forks);
        
        var body = $('<div class="body" />');
        var description = $('<p class="description" />').text(rep.description);
        var updated_at = $('<p class="updated-at" />').text('Last updated: ' + rep.updated_at.replace('T', ' ').replace('Z', ' '));
        
        body.append(description).append(updated_at);  
        
        cur_rep.append(stat).append(rep_name).append(body);
        
        view_repos_list.append(cur_rep);        
      }
      
      view.append(view_repos_list);      
      
      // <li class="public fork">
        // <ul class="repo-stats">
            // <li>JavaScript</li>
          // <li class="watchers"><a href="/utensil/middleman-guides/watchers" title="Watchers">1</a></li>
          // <li class="forks"><a href="/utensil/middleman-guides/network" title="Forks">31</a></li>
        // </ul>
//       
        // <h3>
          // <a href="/utensil/middleman-guides">middleman-guides</a>
        // </h3>
//       
          // <p class="fork-flag">Forked from <a href="/middleman/middleman-guides">middleman/middleman-guides</a></p>
//       
          // <div class="body">
              // <p class="description">
                // Documentation for Middleman
              // </p>
//       
              // <p class="updated-at">Last updated <time class="js-relative-date" datetime="2012-03-10T18:18:34-08:00" title="2012-03-10 18:18:34">8 hours ago</time></p>
          // </div>
      // </li>
      
    }    
  };
  
  $.fn.githubview = function(options) {
       
    var defaults = {
        // @deprecate user: 'utensil', // any github username
      // @deprecate domNode: document.getElementById('githubview-holder'), // domNode to attach to
      count: 3,          // (optional) number of repos per widget page, 3 by default
      showForks: true,  // (optional) show forked repos, true by default
      width: '450px',    // (optional) width of widget, 450px by default
      // @deprecate frameColor: 'grey',      // @deprecate (optional) frame background color, grey by default
      align: 'center'  // (optional) alignment relative to its parent, 'cernter|left|right'
      // @deprecate compact: false,      // (optional) compact mode or full mode? false by default
      // @deprecate noFrame: false,      // (optional) no fancy widget frame, just repositories
      // @deprecate cache: true        // (optional) turn local caching on or off, on by default
  };
  
  var options = $.extend(defaults, options);
  
  //TODO validate options
  
  var view = $('<div></div>').addClass('githubview');
  view.css({
    'width' : options['width'],
    'margin-left' : (options['align'] == 'left' ? '5px' : 'auto'),
    'margin-right' : (options['align'] == 'right' ? '5px' : 'auto')
  });
  this.append(view);
  
  $.ajax('https://api.github.com/users/' + options['user'], {
    type : 'get',
    dataType : 'json',
    crossDomain: true,
    success: function( data ) {      
      
      githubview.createCaption(data);
      
      $.ajax('https://api.github.com/users/' + options['user'] + '/repos', {
        type : 'get',
        dataType : 'json',
        crossDomain: true,
        success: function( data ) {            
           console.log(data);
           githubview.createReposList(data);
      }});
    }});
  
    return this;
  };
})(jQuery);
