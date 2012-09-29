

var JogFacebookModel = {

    configs: {
        url: {
            credentials:  "https://graph.facebook.com/{FB_USER_ID}?access_token={FB_ACCESS_TOKEN}&callback=?",
            friends: "https://graph.facebook.com/{FB_USER_ID}/friends&limit=100?access_token={FB_ACCESS_TOKEN}&limit=100&callback=?",
            fql_base: "https://graph.facebook.com/fql?"
        },
        auth_token : "",
        user_id : "",
    },

    init: function() 
    {
        JogFacebookModel.configs.auth_token = JOGCache.getData("currentUserDetail",null).auth_token;
        JogFacebookModel.configs.user_id = JOGCache.getData("currentUserDetail",null).uid; 
    },

    getFriends: function(fn_cb)
    {
        "use strict";

        var url = JogFacebookModel.configs.url.friends.
                                  replace("{FB_ACCESS_TOKEN}", JogFacebookModel.configs.auth_token).
                                  replace("{FB_USER_ID}", JogFacebookModel.configs.user_id);

        var friends= {};
        var friends_arr = [];
        $.ajax({
              url: url,
              timeout: 10000,
              cache: true,
              dataType: 'jsonp',
              //jsonp: false,
              success:
                  function(fb_data) {
                    if(fb_data.data){
                      $.each(fb_data.data, function(key,friend){
                        var contact_json = {
                                              name: friend.name,
                                              uid: friend.id,
                                              photo: 'https://graph.facebook.com/' + friend.id + '/picture?type=normal'
                                           };
                        friends[friend.id] = contact_json;
                        friends_arr.push(contact_json);
                      });
                      JOGCache.setData("userFriends", friends_arr);
                    }
                  },
              complete:
                  function(fb_data) {
                    if (fn_cb)
                      fn_cb(friends, friends_arr);
                  }
        });
    },    

};
