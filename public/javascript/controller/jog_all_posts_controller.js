var JogAllPostsController = {


	init: function()
	{
		JogAllPostsModel.getPosts();
		JogAllPostsController.initEvents();
		
	},

	initEvents: function()
	{
		$("div.jog_leaderboard_list_post_list_vote_action").live("click", function(e){
			var $this = $(this);
            var postID = $this.attr("data-value");
            JogAllPostsController.updateVote(postID,"big");
            //JogPostListModel.updateVote(postID);
            e.preventDefault();
		});

		$(".jog_lb_vote_action_v2").live("click", function(e){
            var $this = $(this);
            var postID = $this.attr("data-value");
            JogAllPostsController.updateVote(postID, "small");    

            e.preventDefault();
        });
	},

	enablePagination: function()
	{
		$("#jog_recpost_loadmore").live("click", function() {
			JogAllPostsView.paginateAllRecentPosts();
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

