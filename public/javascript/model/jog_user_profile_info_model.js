
var JogUserProfileModel = {

	init: function()
	{
		$.ajax({
                url: JOG.urls.fetchUser,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: $("#cookie_val").val(),
                success: function ( data ) {
                    console.log("back something"); 
                    console.log(data);
                    JOGCache.setData("currentUserDetail", data);
                    JogUserProfileInfoView.init(data);

                    //irisCacheApiSETData("iris.friends", data);
                    //$('#irisSearchOptionFriends').trigger('click');
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
          });
	},
};