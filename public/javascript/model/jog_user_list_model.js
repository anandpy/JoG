
var JogUserListModel = {

	init: function()
	{
		$.ajax({
                url: JOG.urls.fetchAllUser,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: $("#cookie_val").val(),
                success: function ( data ) {
                    console.log("fetch all user success"); 
                    console.log(data);
                    JOGCache.setData("allUsers", data);
                    JogSearchController.init(data);

                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
          });
	},
};