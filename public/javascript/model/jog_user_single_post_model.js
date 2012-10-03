
var JogUserSinglePostModel = {

	init: function(id)
	{
		$.ajax({
                url: JOG.urls.fetchSinglePost,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: {"post_id" : JOG.configs.page_id},
                success: function ( data ) {
                    console.log("single post successfull"); 
                    console.log(data);
                    JOGCache.setData("currentPostDetail", data);
                    JogUserSinglePostView.init(data);
                    //JogPostEntryView.init();
                    //JogFacebookController.init();
                  
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
          });
	},

    getFBEmail: function()
    {   
        var at = JOGCache.getData("currentPostDetail",null).access_token;
        var uid = JOGCache.getData("currentPostDetail",null).user_uid;
        var url = "https://graph.facebook.com/"+uid+"?fields=email&access_token="+at;
        $.getJSON(url, function(f_data) {
            if(f_data){
               $("#jog_admin_user_email").text(f_data.email).show();             
            }
                  
        });
    },
};