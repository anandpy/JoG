

var JogLandingLeaderboardPanelModel = {
 
    // FIXME : REPEATATIONc
	getPosts : function()
	{
        var postLimit = 6;
		$.ajax({
                url: JOG.urls.leaderboardPosts,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: {"limit" : postLimit},
                success: function ( data ) {
                    console.log("leaderboard success"); 
                    console.log(data);
                    
                    JOGCache.setData("leaderboardPosts", data);
                    
                    switch(JOG.configs.page_title) {
                    //case "leaderboard" :
                    //   JogLeaderboardView.init(data);
                    //   break;
                    case "landing_page" : 
                       JogLandingLeaderboardPanelView.init(data);
                       break;
                    //default:
                    //    JogLeaderboardPanelView.init(data);
                    //   break
                    }

                    
                    
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
        });
	}

};

