var resizeTimeout = {};
var resizeContext = {};

function cal_tagcloud_width(tag_array_length, window_width) {
  return Math.min(60 * tag_array_length, Math.min(400, 0.8 * window_width));
}

function cal_tagcloud_height(tag_array_length, window_height) {
  return Math.min(30 * tag_array_length, Math.min(250, 0.8 * window_height));
}

$(function() {
  $.getJSON('tags.json', function(tag_array, statusText) {

    $(window).resize(function() {

      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(function(){

        var orig_w = cal_tagcloud_width(tag_array.length, resizeContext.w);
        var orig_h = cal_tagcloud_height(tag_array.length, resizeContext.h);
        var w = cal_tagcloud_width(tag_array.length, $(window).width());
        var h = cal_tagcloud_height(tag_array.length, $(window).height());

        if($("#tag_cloud").hasClass('inited') && orig_w == w && orig_h == h)
        {
          return;
        }

        //console.log('resize', $(window).width(), $(window).height(), orig_w, orig_h, w, h);

        $("#tag_cloud").empty().jQCloud(tag_array, {
          width: w,
          height: h,
          //shape: 'rectangular',
          afterCloudRender: function() {
            $('a', this).click(function() {
              var show_tag_id = $(this).attr('href').toString().substring(1);
              $('[id^=tag-]').each(function(i, e) {
                //console.log(encodeURI($(e).attr('id').toString()), show_tag_id);
                if(encodeURI($(e).attr('id').toString()) != show_tag_id)
                {
                  $(e).hide();
                }
                else
                {
                  $(e).show();
                }
              });
            return false;
            });
          }
        }).addClass('inited');
      }, 500);

      resizeContext.w = $(window).width();
      resizeContext.h = $(window).height();
    });

    $(window).resize();
  });
});