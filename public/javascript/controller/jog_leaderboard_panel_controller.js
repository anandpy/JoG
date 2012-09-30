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
            JogPostListModel.updateVote(postID);
            e.preventDefault();
		});
	},

};

