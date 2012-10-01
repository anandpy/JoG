
var JogUserProfileModel = {

	init: function()
	{
		$.ajax({
                url: JOG.urls.fetchUser,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: {"user_id" : JOG.configs.page_id},
                success: function ( respData ) {
                    console.log("back something"); 
                    console.log(respData);
                    JOGCache.setData("currentUserDetail", respData);
                    JogUserProfileInfoView.init(respData);
                    JogPostEntryView.init();
                    //JogFacebookController.init();
                  
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
          });
	},
};