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
            JogLeaderboardPanelController.updateVote(postID);
            //JogPostListModel.updateVote(postID);
            e.preventDefault();
		});
	},

	updateVote: function(postID)
	{
		var loggedinUser = JOGCache.getData("loggedinUserData",null);

        if (!loggedinUser)
            JOG.Events.inviteUsersOnVote();
        else
		    JogPostListModel.updateVote(postID);	
		//JogPostListModel.updateVote(postID);
	},

};

