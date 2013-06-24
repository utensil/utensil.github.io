//$('.content article').bind('touchy-swipe', function(e, target, data) {
//    alert(JSON.stringify(data));
//
//    if(data.direction == 'left')
//    {
//        var later = $('.article_nav .later a');
//
//        if(!!later)
//        {
//            window.location = later.attr('href');
//            return true;
//        }        
//    }
//
//    if(data.direction == 'right')
//    {
//        var earlier = $('.article_nav .earlier a');
//
//        if(!!earlier)
//        {
//            window.location = earlier.attr('href');
//            return true;
//        }   
//    }
//
//    return false;    
//});
$(".content article").swipe({swipeLeft:function(e,t,n,r,i){var s=$(".article_nav .later a");return s!=[]?(window.location=s.attr("href"),!0):!1},swipeRight:function(e,t,n,r,i){var s=$(".article_nav .earlier a");return s!=[]?(window.location=s.attr("href"),!0):!1},maxTimeThreshold:1e3});