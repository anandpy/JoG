var JOG = {
	"Events": {
				init: function()
				{
					//JOG.Events.inviteUsersOnVote();
                    JOG.Events.voteClick();
                    JOG.Events.fancyboxImgView();
                    JOG.Events.initLoggedInUser();
				},

				inviteUsersOnVote: function()
				{
					//$(".jog_data_posts_box_metric_vote_action").live("click",function(e){
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
					//	e.preventDefault();	
					//});	
				},



                voteClick: function()
                {
                    $(".jog_data_posts_box_metric_vote_action").live("click", function(e){
                        var $this = $(this);
                        if (JOG.configs.page_title == "loggedin_user")
                            JogPostListController.postVoteUpdate($this);
                        else    
                            JOG.Events.inviteUsersOnVote();
                        e.preventDefault();
                    });
                },

                fancyboxImgView: function()
                {
                    $(".jog_lb_view_image").live("click", function(){
                        var $this = $(this);
                        var url = $this.attr("data-value");
                        $("#jog_view_full_image img").attr("src", url);
                        var $dataID = $("#jog_view_full_image");
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

                initLoggedInUser: function()
                {
                    $.ajax({
                        url: JOG.urls.loggedinUser,
                        type: 'GET',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: '',
                        success: function ( data ) {
                            console.log("Logged in user"); 
                            console.log(data);
                            JOGCache.setData("loggedinUserData", data);
                         },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                            // TODO: WHAT TO DO!!
                            console.log("error while retrieving user");
                        }
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
        "fetchSinglePost" : "/fetch_single_post",
        "postUrl" : "/create_post",
        "postMetric" : "/post_metric",
        "fetchUser" : "/current_user_details",
        "updateVoteCount" : "/update_vote",
        "fetchPosts" : "/fetch_post",
        "leaderboardPosts" : "/leaderboard_posts",
        "fetchAllUser" : "/fetchAllUser",
        "deletePost" : "/delete_post",
        "loggedinUser" : "/loggedin_user"
    },

	"currentUser": {

	},

    appUrl: function()
    {
        $("#jog_url").val();
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
    case "post_show_page" :
        JogUserSinglePostController.init();
        break;
    case "landing_page" :
        JogLandingPostMetricController.init();
        JogLandingLeaderboardPanelController.init();
        break;
    default:
        JogUserProfileModel.init();
        JogLeaderboardPanelController.init();
        JogUserListModel.init();
        JogPostListController.init();    
        JogPostEntryController.init();
        
        //JogDataPostListView.init(postList);
        JogPostListModel.init();
        break;

    }
   

});


