
var JogUserListModel = {

	init: function()
	{
		$.ajax({
                url: JOG.urls.fetchAllUser,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: {"user_id" : JOG.configs.page_id},
                success: function ( data ) {
                    console.log("fetch all user success"); 
                    console.log(data);
                    JOGCache.setData("allUsers", data);
                    JOG.configs.userSearchEnabled = true;
                    JogSearchController.init(data);

                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
          });
	},
};