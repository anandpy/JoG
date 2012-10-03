var JogUserSinglePostController = {

	init: function()
	{
		var post_id = JOG.configs.page_id;
		JogUserSinglePostModel.init(post_id);
		JogUserSinglePostController.initEvents();
	},
	initEvents: function()
	{
		$("#jog_admin_delete").live("click", function() {
			var $this = $(this);
			var postID = $this.attr("data-id");
			JogPostListModel.deletePost(postID, "admin");
		});

		$("#jog_admin_fetch_email").live("click", function(){
			JogUserSinglePostModel.getFBEmail();
		});

	},

};

