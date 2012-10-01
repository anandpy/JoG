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
            //JogPostListModel.updateVote(postID);
            e.preventDefault();
		});

		$(".jog_lb_vote_action_v2").live("click", function(e){
            var $this = $(this);
            var postID = $this.attr("data-value");
            JogLeaderboardPanelController.updateVote(postID, "small");    

            e.preventDefault();
        });
	},

    /* FIXME: change the variable type to something proper */ 
	updateVote: function(postID, type)
	{
		var loggedinUser = JOGCache.getData("loggedinUserData",null);

        if (!loggedinUser)
            JOG.Events.inviteUsersOnVote();
        else

		if (type == "big")
			JogPostListModel.updateVote(postID);	
		else if(type == "small")
			JogLeaderboardPanelView.updateVoteCount(postID);

		//JogPostListModel.updateVote(postID);
	},

};

