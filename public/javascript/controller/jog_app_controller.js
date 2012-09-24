

$(document).ready(function(){

	JOG.Events.init();


	

    if ( JOG.configs.page_title === "leaderboard") {
    	JogLeaderboardView.init(leaderboardData);
    	$("#jog_leader_board_side_panel").hide();

    } else {
    	JogLeaderboardPanelView.init(leaderboardPanel);

    	JogPostEntryView.init();

    	JogDataPostListView.init(postList);

    	JogUserProfileModel.init();
	
    }
   
    
    

});



var JOG = {

    

	"Events": {
				init: function()
				{
					JOG.Events.inviteUsersOnVote();
					JOG.Events.viewFullPost();
                    JOG.Events.createPost();
                    JOG.Events.voteClick();
				},

				inviteUsersOnVote: function()
				{
					$(".jog_data_posts_box_metric_vote_action").live("click",function(e){
						var $dataID = $("#jog_invite_user_for_signup"); 
						$.fancybox({
                			content: $dataID,
                			'padding': 0, 
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
						e.preventDefault();	
					});	
				},

				viewFullPost: function()
				{
					$(".jog_data_posts_box_title").live("click", function(e){

						var $this = $(this);

						//var postID = $.this.attr("post-id");

						JogDataPostDetailView.init(detailPost);

						var $detailPost = $("#jog_detail_post_view_modal");

						$.fancybox({
                			content: $detailPost,
                			'padding': 0, 
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
						e.preventDefault();
					});
				},


                createPost: function()
                {
                    $("#jog_data_post_entry_action_submit").live("click", function(e){

                        var postParam = {};
                        
                        postParam.title = $("#jog_data_post_entry_title").val();
                        postParam.text = $("#jog_data_post_entry_text").val();
                        postParam.imgSrc = "/123.png";
                        postParam.userID = "123456789";

                        JogPostEntryController.createPost(postParam);    
                    });
                },

                voteClick: function()
                {
                    $(".jog_data_posts_box_metric_vote_action").live("click", function(e){
                        var $this = $(this);
                        JogPostListController.postVoteUpdate($this);
                    });
                },
	},

	"configs" :{
			"page_title" : "landing"
	},

    "urls" : {
        "postUrl" : "/create_post",
        "fetchUser" : "/current_user_details",
        "updateVoteCount" : "/update_vote",
    },

	"currentUser": {

	},


};


