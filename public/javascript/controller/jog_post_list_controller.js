
var JogPostListController = {
	init: function()
    {
    	JogPostListController.initEvents();
    },

    initEvents: function()
    {
		/*$(".jog_data_posts_box_title").live("click", function(e){
		    JogPostListController.viewFullPost($(this));
			e.preventDefault();
		});*/
		
        $(".jog_data_post_delete").live("click", function(e){
            var $this = $(this);
            var postID = $this.attr("data-value");
            JogPostListModel.deletePost(postID);
            e.preventDefault();
        });

        $(".jog_data_post_list_vote_action").live("click", function(e){
            var $this = $(this);
            var postID = $this.attr("data-value");
            JogPostListController.postVoteUpdate(postID)
            //JogPostListModel.updateVote(postID);
            e.preventDefault();
        });


    },

    restrainDoubleVoting: function()
    {
        var $dataID = $("#jog_double_vote_msg"); 
        $.fancybox({
                content: $dataID,
                'padding': 4, 
                'autoSize': false, 
                'height' : 'auto', 
                'width' : 'auto',
                openSpeed: 'normal',
                closeBtn: true,
                autoSize: true,
                topRatio: 0,
                beforeClose:function() {
                   //TODO: Nothing to be done on close
                }
        });
    },

	postVoteUpdate: function(postID)
	{

        //var data = {};

        //data.postID = obj.attr("post-id");
        //var currentUserCredentials = JOGCache.getData("")

        var loggedinUser = JOGCache.getData("loggedinUserData",null);

        if (!loggedinUser)
            JOG.Events.inviteUsersOnVote();
        else
		    JogPostListModel.updateVote(postID);
	},

    

    viewFullPost: function(obj)
    {

		var $this = obj;

		var postID = $this.parent().attr("data-post-id");
		var userID = $this.parent().attr("data-post-userid");

		//alert(postID + " " userID);

        var posts = JOGCache.getData("currentUserPosts", null);

        var postData; 
        $.each(posts, function(index, post){
        	if (post.id == postID && post.user_id == userID) {
        		postData = post;
        		return false;
        	}
        });

		JogDataPostDetailView.init(postData);

		var $detailPost = $("#jog_detail_post_view_modal");

		$.fancybox({
        	content: $detailPost,
            'padding': 0, 
            'autoSize': false, 
            'height' : 'auto', 
            'width' : 600,
            openSpeed: 'normal',
            closeBtn: true,
            autoSize: true,
            topRatio: 0,
            beforeClose:function() {
                    //TODO: Nothing to be done on close
            }
        });

    },

};

