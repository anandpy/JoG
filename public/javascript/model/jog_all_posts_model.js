

var JogAllPostsModel = {

	getPosts : function()
	{
		$.ajax({
                url: JOG.urls.allPosts,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: $("#cookie_val").val(),
                success: function ( respdata ) {
                    console.log("leaderboard success"); 
                    console.log(respdata);
                    
                    JOGCache.setData("allPosts", respdata);
                    JogAllPostsView.init(respdata);
                                        
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
        });
	}

};

