var JOG = {
	"Events": {
				init: function()
				{
					JOG.Events.inviteUsersOnVote();
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
            "page_id" : $("#jog_page_id").val(),
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




$(document).ready(function(){

    JOG.Events.init();
  
    switch (JOG.configs.page_title) {
    case "leaderboard" :
        $("#jog_leader_board_side_panel").hide();
        JogLeaderboardPanelController.init();

        break;
    case "user_show_page" :
        JogUserProfileModel.init();
        JogUserListModel.init();
        JogPostListModel.init();
        JogPostListController.init();
        JogLeaderboardPanelController.init();
        break;
    case "user_post_page" :
        break;
    case "landing_page" :
        JogLandingLeaderboardPanelController.init();
        break;
    default:
        JogLeaderboardPanelController.init();
        JogUserProfileModel.init();
        JogUserListModel.init();
        JogPostListController.init();    
        JogPostEntryController.init();
        JogPostEntryView.init();
        //JogDataPostListView.init(postList);
        JogPostListModel.init();
        break;

    }
   

});


