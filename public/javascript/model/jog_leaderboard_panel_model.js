

var JogLeaderboardPanelModel = {

	getPosts : function()
	{
        if (JOG.configs.page_title === "leaderboard")
           var postData = {}; 
        else
           var postData = {"limit" : 6};
		$.ajax({
                url: JOG.urls.leaderboardPosts,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: postData,
                success: function ( data ) {
                    console.log("leaderboard success"); 
                    console.log(data);
                    
                    JOGCache.setData("leaderboardPosts", data);
                    
                    if (JOG.configs.page_title === "leaderboard" || JOG.configs.page_title === "all_posts") {
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

