var JOG = {
	"Events": {
				init: function()
				{
					//JOG.Events.inviteUsersOnVote();
                    JOG.Events.voteClick();
                    JOG.Events.fancyboxImgView();
                    JOG.Events.initLoggedInUser();
                    JOG.Events.enableTipsy();
				},

				inviteUsersOnVote: function(postID)
				{
                    JOG.Events.setRedirectCallbackForOuth(postID);
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
                            'width': 500,
                            'height': 500,
                            'padding': 20, 
                            'autoSize': false, 
                            openSpeed: 'normal',
                            closeBtn: true,
                            autoSize: false,
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
                        async: false,
                        url: JOG.urls.loggedinUser,
                        type: 'GET',
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function ( data ) {
                            console.log("Logged in user"); 
                            console.log(data);
                            JOGCache.setData("loggedinUserData", data);
                            //alert(JSON.stringify(data));
                         },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                            // TODO: WHAT TO DO!!
                            console.log("error while retrieving user");
                        }
                    });
                },
                enableTipsy: function()
                {
                    $(".enableTipsy").tipsy({live: true, gravity: 'w'});
                },

                setRedirectCallbackForOuth: function(postID)
                {
                    $.ajax({
                        url: JOG.urls.updateRedirectTo,
                        type: 'GET',
                        dataType: 'json',
                        data: {"link":"posts", "id":postID},
                        contentType: 'application/json',
                        success: function ( respdata ) {
                            console.log("Redirect To"); 
                            console.log(respdata);
                            JOGCache.setData("redirectTo", respdata);
                            var $dataID = $("#jog_invite_user_for_signup"); 
                            $.fancybox({
                                content: $dataID,
                                'padding': 10, 
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
        "fetchAllUser" : "/fetch_all_user",
        "deletePost" : "/delete_post",
        "loggedinUser" : "/loggedin_user",
        "allPosts" : "/fetch_all_posts",
        "updateRedirectTo" : "/update_call_back"
    },

	"currentUser": {

	},

    appUrl: function()
    {
        return $("#jog_url").val();
    },

    btnNavSetup: function()
    {
        var loggedinUser = JOGCache.getData("loggedinUserData", null);
        if (!loggedinUser) {
            $("#jog_logout_v2").hide();
            $("#jog_home").hide();
        }
    },    

    getPostLink: function(id)
    {
        return JOG.appUrl()+"/post/"+id;
    },

    getUserLink: function(id)
    {
        return JOG.appUrl()+"/show/"+id;
    },

    prettifyTimeStamps: function(date)
    {
        return new Date($.prettyDate.parse(date)).toDateString();
    },

    applyShadow: function()
    {
        $("#slides").shadow('raised');
        $("#jog_fconnect").shadow({type:'sides', sides:'vt-1'});
        //$("#jog_lp_container").shadow({type:'sides', sides:'vt-1'});
        $("#jog_data_post_entry").shadow('lifted');
    },

    enableHelpWindow: function()
    {
        $("#jog_landing_help").live("click", function(){
            var $dataID = $("#jog_help_window"); 
            $.fancybox({
                        content: $dataID,
                        'padding': 10, 
                        'autoSize': true, 
                        openSpeed: 'normal',
                        closeBtn: true,

                        topRatio: 0,
                        beforeClose:function() {
                               //TODO: Nothing to be done on close
                        }
                       });
        });
    },

    enableTnCWindow: function()
    {
        $("#jog_tnc_click").live("click", function(){
            var $dataID = $("#jog_tnc_window"); 
            $.fancybox({
                        content: $dataID,
                        'padding': 10, 
                        'autoSize': true, 
                        openSpeed: 'normal',
                        closeBtn: true,

                        topRatio: 0,
                        beforeClose:function() {
                               //TODO: Nothing to be done on close
                        }
                       });
        });
    },
};




$(document).ready(function(){

    JOG.Events.init();
    
    /* FIXME : REPEATATION */ 
    switch (JOG.configs.page_title) {
    case "leaderboard" :
        $("#jog_leader_board_side_panel").hide();
        JogUserProfileModel.init();
        JogLeaderboardPanelController.init();
        JogLandingPostMetricController.init();

        break;
    case "user_show_page" :
        JogUserProfileModel.init();
        JogUserListModel.init();
        JogPostListModel.init();
        JogPostListController.init();
        JogLeaderboardPanelController.init();
        break;
    case "post_show_page" :
        $("#jog_leader_board_side_panel").hide();
        var loggedinUser = JOGCache.getData('loggedinUserData', null);
        if (loggedinUser)
            JogUserProfileInfoView.displayProfileInfo(loggedinUser);

        JogUserSinglePostController.init();
        JogLeaderboardPanelController.init();
        JogLandingPostMetricController.init();
        break;
    case "landing_page" :
        JOG.enableHelpWindow();
        JOG.enableTnCWindow();
        JogLandingPostMetricController.init();
        JogLandingLeaderboardPanelController.init();
        break;
    case "all_posts":
        $("#jog_leader_board_side_panel").hide();
        JogUserProfileModel.init();
        JogLandingPostMetricController.init();
        JogAllPostsController.init();
        
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
 
    JOG.btnNavSetup();
    JOG.applyShadow();

});


