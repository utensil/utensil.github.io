var Gitview = function(args){
	// Builds optional outer frame
	this.createFrame = function(){
		//outer
		var outer = dojo.create('div',{
			'class':'outer',
			style:'position:relative;text-align:left;line-height:15px;padding:5px 5px 23px 5px;background:'+this.frameColor+';border-radius:5px;width:'+this.w+';'
		},this.domNode);
		//inner
		var inner = dojo.create('div',{
			style:'height:100%;width:'+this.w+';'
		},outer);
		//create page buttons
		var right = dojo.create('a',{
			'class':'button icon arrowright',style:'float:right;margin-left:5px'
		},outer,'last');
		var left = dojo.create('a',{
			'class':'button icon arrowleft',style:'float:right;'
		},outer,'last');
		//connect page buttons
		dojo.connect(right,'onclick',this,'nextPage');
		dojo.connect(left,'onclick',this,'prevPage');
		this.domNode = inner;
	};
	
	// Builds frame header (if frame arg is set to true)
	this.createFrameHeader = function(data){
		//1. table
		var table = dojo.create('table',{'style':'height:47px;width:100%;border-spacing:0;'
		+'border-collapse:collapse;margin:0px;padding:0px;'},this.domNode,'before');
		var row = dojo.create('tr',{},table);
		
		//2. avater cell
		var avatarCell = dojo.create('td',{style:'width:41px;vertical-align:top;padding:0px;'},row);
		var otherCell = dojo.create('td',{style:'padding:0px;'},row);
		
		//3. avatar
		dojo.create('img',{
			src:data.avatar_url,
			style:'width:40px;height:auto;border-radius:2px;position:relative;'
		},avatarCell);
		
		//4. user name
		dojo.create('span',{
			innerHTML:data.login+'<br>',
			style:'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:13px;'
			+'color:white;font-weight:bold;margin-left:6px'
		},otherCell);
		
		//5. followers
		var t = dojo.create('span',{
			innerHTML:data.followers+' follower',
			style:'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:12px;color:#AAA;margin-left:6px'
		},otherCell);
		if(data.followers > 1 || data.followers == 0)
			t.innerHTML += 's';
		
		//6. repos
		var v = dojo.create('span',{
			innerHTML:' - '+data.public_repos+' repositor',
			style:'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:12px;color:#AAA;'
		},otherCell);
		if(data.public_repos > 1 || data.public_repos == 0)
			v.innerHTML += 'ies';
		else
			v.innerHTML += 'y'
			
		//7. toggle full / compact buttons
		var x = dojo.create('span',{
			innerHTML:'compact',
			style:'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:10px;color:#AAA;'
			+'cursor:hand;cursor:pointer;margin-left:5px;position:absolute;top:38px;right:27px'
		},this.domNode,'before');
		var w = dojo.create('span',{
			innerHTML:'full',
			style:'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:10px;color:#AAA;cursor:hand;cursor:pointer;'
			+'position:absolute;top:38px;right:7px'
		},this.domNode,'before');
		
		//8. connect things
		dojo.connect(w,'onclick',this,'toggleFull');
		dojo.connect(x,'onclick',this,'toggleCompact');
	};
	
	// Builds each repo node
	this.createRepoEntry = function(obj,showAsCompact){
		if(!obj.fork || (obj.fork && this.showForks)){
			//1. repo container
			var container = dojo.create('div',{
				'class':'entry',
				style:"text-align:left;border:1px solid #DDD;border-radius:4px;margin-bottom:5px;background:white;"
			},this.domNode);
			this.entries.push(container);
			if(!this.frame) dojo.style(container,'width',this.w);
			if(this.compact) dojo.style(container,'marginBottom','5px');
			if(this._index >= this.count)
				dojo.style(container,'display','none');

			//2. build top section
			var top = this.createTop(obj, container);
			this.tops.push(top);

			//3. build bottom section
			var bottom = this.createBottom(obj, container);	
			this.bottoms.push(bottom);

			this._index++;
		}
	};
	
	// Builds entry top (title, forks, watchers, etc.)
	this.createTop = function(obj, container){
		//1. top (title, forks, watchers, etc.)
		var top = dojo.create('div',{ 
			'class':'top',
			style:"height:32px;line-height:38px;border-bottom:1px solid #DDD;" 
		},container);
		if(this.compact) dojo.style(top,'borderBottom','0px');
		
		//2. smiley icon
		var s = (obj.fork) ? 'http://logicalcognition.com/files/gitviewFiles/fork.png' : 'https://a248.e.akamai.net/assets.github.com/images/icons/public.png'
		dojo.create('img',{
			src:s,
			style:'margin-left:6px'
		},top);
		
		//3. title
		var repoName = dojo.create('a',{ innerHTML: obj.name, href:'https://github.com/'+this.user+'/'+obj.name,
			style:'color:#4183C4;font-size:14px;font-weight:bold;font-family:arial;position:relative;top:-3px;'
			+'margin-left:6px;text-decoration:none'
		},top);
		dojo.connect(repoName,'onmouseover',function(e){ dojo.style(e.target,'textDecoration','underline') });
		dojo.connect(repoName,'onmouseout',function(e){ dojo.style(e.target,'textDecoration','none') });
		
		//4. container for watchers & forks
		var stats = dojo.create('div',{
			style:'display:inline-block;float:right;color:#666;font-size:11px;font-family:arial;font-weight:bold;'
		},top);
		
		//5. language if there is one
		if(obj.language) dojo.create('span',{innerHTML:obj.language,'style':'position:relative;top:-3px;'},stats);
		
		//6. watchers
		var watchers = dojo.create('a',{
			innerHTML:'<img src="http://logicalcognition.com/files/gitviewFiles/repostat_watchers.png"/>&nbsp;<font color="#666;">'+obj.watchers+'</font>',
			href:'https://github.com/'+this.user+'/'+obj.name+'/watchers',
			style:'position:relative;top:-3px;margin-left:10px;text-decoration:none;'
		},stats);
		
		//7. forks
		var forks = dojo.create('a',{
			innerHTML:'<img src="http://logicalcognition.com/files/gitviewFiles/repostat_forks.png"/>&nbsp;<font color="#666;">'+obj.forks+'</font>',
			href:'https://github.com/'+this.user+'/'+obj.name+'/network',
			style:'position:relative;top:-3px;margin-left:10px;text-decoration:none;margin-right:15px'
		},stats);
		
		return top;
	};
	
	// Builds entry bottom (graph, last updated, etc.)
	this.createBottom = function(obj, container){
		//1. Bottom (graph, last updated, etc.)
		var bottom = dojo.create('div',{
			'class':'bottom',
			style:'border-bottom-right-radius:3px;border-bottom-left-radius:3px;padding-bottom:5px;padding-top:5px'
		},container);
		if(dojo.isWebKit)
			dojo.style(bottom,'backgroundImage',"-webkit-gradient(linear, 0% 0%, 0% 100%, from(#FAFAFA), to(#EFEFEF))");
		else if(dojo.isFF)
			dojo.style(bottom,'background','-moz-linear-gradient(center top , #FAFAFA, #EFEFEF) repeat scroll 0 0 transparent');
	
		//2. Slice & build repo description
		var d = obj.description;
		if(d.length > 100) d = d.slice(0,97)+'...';
		var description = dojo.create('div',{innerHTML:d,style:'font:12px arial;margin-left:10px;height:30px'},bottom);
	
		//3. Participation graph & last updated
		var updated = dojo.create('div',{
			innerHTML:'Last updated '+this.fixUpdateDate(obj.pushed_at),
			style:'font:11px arial;color:#888;margin-top:5px;margin-left:10px;'
		},bottom);
		
		//4. Graph
		if(!this._tmpW) this._tmpW = (container.offsetWidth-35)+'px';
		var graph = new Gitgraph({user:this.user,repo:obj.name,domNode:bottom,width:this._tmpW});
		dojo.style(graph,'marginLeft','auto');
		dojo.style(graph,'marginRight','auto');	
		dojo.style(graph,'marginTop','5px');
		dojo.style(graph,'marginBottom','5px');
		
		if(this.compact)
			dojo.style(bottom, 'display', 'none');
		
		return bottom;
	};
	
	// Toggles full mode
	this.toggleFull = function(){
		this.bottoms.forEach(function(node){ dojo.style(node,'display','block'); });
		this.tops.forEach(function(node){ dojo.style(node,'borderBottom','1px solid #DDD1px solid #DDD'); });
	};
	
	// Toggles compact mode
	this.toggleCompact = function(){
		this.bottoms.forEach(function(node){ dojo.style(node,'display','none'); });
		this.tops.forEach(function(node){ dojo.style(node,'borderBottom','0px'); });
	};
	
	// Go to next page of repos
	this.nextPage = function(){
		var lower = this._pageMax;
		this._pageMax = ((this._pageMax+this.count)<=this._repoCount) ? (this._pageMax+this.count) : this._repoCount;
		var upper = this._pageMax;
		if(lower != upper){
			for(var i=0; i<this.entries.length; i++){
				if(i<lower)
					dojo.style(this.entries[i],'display','none');
				else if(i<upper)
					dojo.style(this.entries[i],'display','block');
			}
		}
	};
	
	// Go to prev page of repos
	this.prevPage = function(){
		var diff = 0;
		dojo.forEach(this.entries,function(node){
			if(dojo.style(node,'display')!='none')
				diff++
		});
		this._pageMax = ((this._pageMax-diff)>=this.count) ? (this._pageMax-diff) : this.count;
		var upper = this._pageMax;
		var lower = ((this._pageMax-this.count)>=0) ? (this._pageMax-this.count) : 0;
		if(!((upper==lower)&&(upper==0))){
			for(var i=0; i<this.entries.length; i++){
				if(i>=upper)
					dojo.style(this.entries[i],'display','none');
				else if(i>=lower)
					dojo.style(this.entries[i],'display','block');
			}
		}
	};
	
	// Changes regular formatted date into '1 day ago', '9 hours ago', etc.
	this.fixUpdateDate = function(date){
		// TODO: currently I just return the date as-is, I need to implement this
		return date;
	};
	
	// Loads repos using JSONP
	this.loadRepos = function(){
		// Try to get repos from cache if we can
		var repos = JSON.parse(this.store.get('repo_data_'+this.user));
		// If we have them in the cache, don't do an XHR request, just build
		if(repos && this.cache){
			this.repos = repos;
			this.sortRepos(this.repos);
			this._index = 0;
			this._pageMax = this.count;
			// For each repo, built an entry
			for(var i=0; i<this.repos.length; i++)
				this.createRepoEntry(this.repos[i]);
			this._repoCount = dojo.query('.entry').length;
		}else{
			// Get repo info
			dojo.io.script.get({
				url: 'https://api.github.com/users/'+args.user+'/repos',
		      	callbackParamName: "callback",
		      	load: dojo.hitch(this,function(obj){ 
					this.repos = obj.data;
					this.sortRepos(this.repos);
					var jsonText = JSON.stringify(obj.data);
					this.store.set('repo_data_'+this.user, jsonText);
					this._index = 0;
					this._pageMax = this.count;
					// For each repo, built an entry
					for(var i=0; i<this.repos.length; i++)
						this.createRepoEntry(this.repos[i]);
					this._repoCount = dojo.query('.entry').length;
				}),
		      	error: function(error){ console.error(error); }
			});	
		}
	};
	
	// load user data using JSONP
	this.loadUser = function(){
		// Try to get user info from cache if we can
		var user = JSON.parse(this.store.get('user_data_'+this.user));
		// If we have it in the cache, don't do an XHR request, just build
		if(user && this.cache){
			this.createFrame();
			this.createFrameHeader(user);
			this.loadRepos();
		}else{
			dojo.io.script.get({
				url: 'https://api.github.com/users/'+args.user,
		      	callbackParamName: "callback",
		      	load: dojo.hitch(this,function(obj){ 
					this.createFrame();
					var jsonText = JSON.stringify(obj.data);
					this.store.set('user_data_'+this.user, jsonText);
					this.createFrameHeader(obj.data);
					this.loadRepos();
				}),
		      	error: function(error){ console.error(error); }
			});
		}
	};
	
	// Dynamically load JS script with callback
	this.loadScript = function(sScriptSrc,callbackfunction) {
		var oHead = document.getElementsByTagName('head')[0];
		if(oHead){	
			var oScript = document.createElement('script');
			oScript.setAttribute('src',sScriptSrc);
			oScript.setAttribute('type','text/javascript');
			var loadFunction = function(){
				if (this.readyState == 'complete' || this.readyState == 'loaded')
					callbackfunction(); 
			};
			oScript.onreadystatechange = loadFunction;
			oScript.onload = callbackfunction;	
			oHead.appendChild(oScript);
		}
	};
	
	// Dynamically load CSS
	this.loadTemplate = function(url) {
        var e = document.createElement("link");
        e.href = url;
        e.type = "text/css";
        e.rel = "stylesheet";
        e.media = "screen";
        document.getElementsByTagName("head")[0].appendChild(e);
    };

	// Sorts repos based on update date
	this.sortRepos = function(arr){
		arr.sort(function(a, b){
		    var keyA = new Date(a.pushed_at),
		    keyB = new Date(b.pushed_at);
		    // Compare the 2 dates
		    if(keyA < keyB) return -1;
		    if(keyA > keyB) return 1;
		    return 0;
		});
		arr.reverse();
	};
	
	// Bind, for browsers not supporting it by default
	this.bind = function (oThis){
		if (typeof this !== "function")
		  throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		var aArgs = Array.prototype.slice.call(arguments, 1), 
		    fToBind = this, fNOP = function () {},
		    fBound = function () {
		      return fToBind.apply(this instanceof fNOP
	                ? this
	                : oThis || window,
	              aArgs.concat(Array.prototype.slice.call(arguments)));
		    };
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
	
	// Get required scripts loaded
	this.bootstrap = function(){
		if(!window.dojo)
			this.loadScript('http://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js',this.kickStart.bind(this));
		else
			this.kickStart.bind(this)();
	};
	
	// Kick things off once Gitgraph is loaded
	this.kickStart = function(){
		dojo.require('dojo.io.script');
		dojo.ready(this,function(){
			// Create cache
			this.store = new Persist.Store('Gitview');
			
			// load helper css
			this.loadTemplate('http://logicalcognition.com/files/gitviewFiles/gh-buttons.css');
			
			// ASYNC UGLINESS
			// Get user info if we built a frame (avatar, etc.)
			if(this.frame)
				this.loadUser();
			else
				this.loadRepos();
		});
	};
	
	// Initiatialization
	if(!args || !args.user){
		throw new Error('Gitview: missing user and/or domNode arg');
	}else{
		// Parameters
		this.user 		= args.user;
		this.domNode 	= args.domNode ? args.domNode : document.body;
		this.compact 	= args.compact==true ? true : false;
		this.frame	 	= !(args.noFrame==true ? true : false);
		this.showForks  = args.showForks==false ? false : true;
		this.cache		= args.cache==false ? false : true;
		this.count		= args.count ? args.count : 3;
		this.w			= args.width ? args.width : '440px';
		this.w			= this.w.substring(0,this.w.length-2)<300 ? '350px' : this.w;
		this.frameColor	= args.frameColor ? args.frameColor : '#444';
		this.repos 		= [];
		this.entries 	= [];
		this.bottoms 	= [];
		this.tops 		= [];
		
		// Make sure bind( ) is a function
		if (!Function.prototype.bind) Function.prototype.bind = this.bind;
		
		// Dynamically load scripts and continue building
		this.loadScript('http://logicalcognition.com/Projects/persist-js/persist-min.js',function(){
			this.loadScript('http://logicalcognition.com/Projects/Gitgraph/Gitgraph.js',this.bootstrap.bind(this));	
		}.bind(this));
	}
};

//Make Jquery folks happy
if (window.jQuery) {
    jQuery.fn.gitview = function (args) {
        if(!args || !args.user){
			throw new Error('Gitview: missing user arg');
		}else{
			this.each(function () {
	            var view = new Gitview({ 
	                user    	: args.user,     
	                domNode 	: $(this)[0], 
	                compact 	: args.compact==true ? true : false,
					noFrame 	: args.noFrame==true ? true : false,
					cache   	: args.cache==false ? false : true,
					showForks	: args.showForks==false ? false : true,
					count  		: args.count ? args.count : 3,
					width   	: args.width ? args.width : '440px',
					frameColor 	: args.frameColor ? args.frameColor : '#444'
	            });
	        });
		}
    };
}