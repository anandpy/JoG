var JogLeaderboardPanelController = {


	init: function()
	{
		JogLeaderboardPanelModel.getPosts();
		JogLeaderboardPanelController.initEvents();
		
	},

	initEvents: function()
	{
		$("div.jog_leaderboard_list_post_list_vote_action").live("click", function(e){
			var $this = $(this);
            var postID = $this.attr("data-value");
            JogLeaderboardPanelController.updateVote(postID,"big");
            //JOG.postToFBWallOnVote();
            //JogPostListModel.updateVote(postID);
            e.preventDefault();
		});

		$(".jog_lb_vote_action_v2").live("click", function(e){
            var $this = $(this);
            var postID = $this.attr("data-value");
            JogLeaderboardPanelController.updateVote(postID, "small");    
            //JOG.postToFBWallOnVote();
            e.preventDefault();
        });
	},

	enablePagination: function()
	{
		$("#jog_lbv_loadmore").live("click", function() {
			
			JogLeaderboardView.paginateLeaderboard();
		});
	},

    /* FIXME: change the variable type to something proper */ 
	updateVote: function(postID, type)
	{
		var loggedinUser = JOGCache.getData("loggedinUserData",null);

        if (!loggedinUser)
            JOG.Events.inviteUsersOnVote(postID);
        else
        JogPostListModel.updateVote(postID, type);	
	},

};

