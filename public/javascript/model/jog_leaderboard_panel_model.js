

var JogLeaderboardPanelModel = {

	getPosts : function()
	{
		$.ajax({
                url: JOG.urls.leaderboardPosts,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: $("#cookie_val").val(),
                success: function ( data ) {
                    console.log("leaderboard success"); 
                    console.log(data);
                    
                    JOGCache.setData("leaderboardPosts", data);
                    
                    if (JOG.configs.page_title === "leaderboard") {
                        JogLeaderboardView.init(data);
                    } else {
                        JogLeaderboardPanelView.init(data);
                    }
                    
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
        });
	}

};

