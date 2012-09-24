

$(document).ready(function(){

	JOG.Events.init();
    JogLeaderboardPanelController.init();
    if ( JOG.configs.page_title === "leaderboard") {
    	
    	$("#jog_leader_board_side_panel").hide();

    } else {
        
        JogUserListModel.init();

        JogPostEntryController.init();
        
        
    	
        JogPostEntryView.init();

    	//JogDataPostListView.init(postList);

    	JogUserProfileModel.init();

        JogPostListModel.init();
	
    }
});



var JOG = {
	"Events": {
				init: function()
				{
					JOG.Events.inviteUsersOnVote();
                    JOG.Events.voteClick();
                    JogPostListController.init();
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



                voteClick: function()
                {
                    $(".jog_data_posts_box_metric_vote_action").live("click", function(e){
                        var $this = $(this);
                        JogPostListController.postVoteUpdate($this);
                        e.preventDefault();
                    });
                },
	},



    "utils": {

        truncateText: function(text, truncateLength)
        {
            if (text && text.length > truncateLength)
                //return jQuery.trim(text).substring(0, maxLength).split(" ").slice(0, -1).join(" ") + "..";
                return jQuery.trim(text).substring(0, truncateLength) + "..";
            else
                return text;
        },

    },

	"configs" :{
			"page_title" : $("#jog_page_mode").val(),
	},

    "urls" : {
        "postUrl" : "/create_post",
        "fetchUser" : "/current_user_details",
        "updateVoteCount" : "/update_vote",
        "fetchPosts" : "/fetch_post",
        "leaderboardPosts" : "/leaderboard_posts",
        "fetchAllUser" : "/fetchAllUser",
    },

	"currentUser": {

	},


};


