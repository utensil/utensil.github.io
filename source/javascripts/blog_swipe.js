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

$(".content article").swipe( {
    swipeRight:function(event, direction, distance, duration, fingerCount) {

        var later = $('.article_nav .later a');

        if(later.length != 0)
        {
            window.location = later.attr('href');
            return false;
        }

        return true;
    },
    swipeLeft:function(event, direction, distance, duration, fingerCount) {

        var earlier = $('.article_nav .earlier a');

        if(earlier.length != 0)
        {
            window.location = earlier.attr('href');
            return false;
        } 

        return true;
    },
    maxTimeThreshold: 1000
});