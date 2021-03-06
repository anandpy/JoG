


var JogLeaderboardPanelView = {
 
    "config": {
        "panelViewCount" : 6,
    },
 

	init:  function(data)
	{
		JogLeaderboardPanelView.display(data);
	},

    updateVoteCount: function(data)
    {
        var $this = $("#jog_update_postvote_with_id_"+data.id);
     
        var text = data.votes_count + " Votes";

        $this.html(text);
    },
 
	display: function(data)
	{
		var html = "";
        var itr = 0;
        
        html = html + '<div id="jog_leader_board_lists">';

        $.each(data, function(index, leader) { 
            if (index > JogLeaderboardPanelView.config.panelViewCount)
                return false;
  			html = html + JogLeaderboardPanelView.leaderPostHtml(leader);
            
            
		});

        html = html + 
               '<a href="/leaderboard">'+
               '<div id="jog_loadmore_lbp_v2"></div>';
               '</a>';

        html = html + '</div>';
        $("#jog_leader_board_side_panel").append(html);

        /* FIXME : I do not belong here, put me at right place */
        if(JOG.configs.page_title == "leaderboard")
            JogLeaderboardPanelView.showRecentPostLink();
	},

    showRecentPostLink: function()
    {
        $("#jog_js_dynnav_link").html('<a href="/all_posts"><div id="jog_view_timeline_posts">| View All Posts</div></a>')
        
    },

	leaderPostHtml : function(data)
	{
		var html = "";
         
        var imgHtml = (data.post_pic && data.post_pic !== "" ) ? '<div class="jog_lb_view_image" data-value="'+data.post_pic+'"> View Image</div>' : "";  

        var loggedinUser = JOGCache.getData("loggedinUserData", null);

        var tipsyTitleClass = (data.post_title.length > 18) ? "enableTipsy" : "";
        var tipsyPostClass = (data.post_title.length > 120) ? "enableTipsy" : "";

        function voteHtml()
        {
            var html =  (loggedinUser && data.user_uid == loggedinUser.uid) ? "" : '<div class="jog_lb_vote_action_v2" data-value="'+data.post_id+'"></div>';
            var testHtml =  '<div class="jog_lb_vote">'+
                                '<div id="jog_update_postvote_with_id_'+data.post_id+'" class="jog_lb_vote_count">'+data.votes_count+' Votes</div>'+
                                html+
                   '</div>';
            return testHtml;       
        }

        html = '<div class="jog_leader_board_entry">' +
                    '<div class="jog_lb_user_name">'+
                        '<a href="/show/'+data.user_uid+'"><h5>'+data.user_name+'</h5></a>'+
                        '<div class="jog_lb_ul1"></div>'+
                    '</div>'+
                    '<div class="jog_lb_post_date_data">'+
                        JOG.prettifyTimeStamps(data.time_stamp) +
                    '</div>'+
                    '<div class="jog_lb_content">'+
                        '<div class="jog_lb_leftside">'+
                            '<div class="jog_lb_user_photo">'+
                                '<img src="'+data.user_pic+'">'+
                            '</div>'+
                            voteHtml()+
                        '</div>'+
                        '<div class="jog_lb_rightside">'+
                            '<a href="'+JOG.getPostLink(data.post_id)+'">'+
                              '<div class="jog_lb_msg '+tipsyTitleClass+'" original-title="'+data.post_title+'">'+JOG.utils.truncateText(data.post_title, 18)+'</div>'+
                            '</a>'+ 
                            '<p class="jog_lb_text '+tipsyPostClass+'" original-title="'+data.post_text+'">'+JOG.utils.truncateText(data.post_text,120)+'</p>'+
                            '<div class="jog_lb_by">'+
                            '</div>'+
                        '</div>'+
                        imgHtml+
                        
                    '</div>'+
                    '<div class="jog_lb_divider"></div>'+
                '</div>'; 
    	return html;
	},

};







/* Leaderboard Page View */

/* FIXME  : Since now we have both recent and leadeboard as same view, replace this duplication */
var JogLeaderboardView = {
 
    "configs" : {
            "paginateSize" : 20,
            "paginationPoint" : 0,
            "dataLength" : 0,
    },  

    init:  function(data)
    {
        JogLeaderboardView.configs.dataLength = data.length;
        JogLeaderboardView.display(data);
    },

    updatePaginationPoint: function()
    {
        JogLeaderboardView.configs.paginationPoint += JogLeaderboardView.configs.paginateSize;
    }, 

    display: function(data)
    {
        var html = "";
        
        var postCount = data.length;  

        var enablePagination = false;
       
        html = html + '<div id="jog_data_posts_leaderboard_list_v2">' +
                        '<h1>Leaderboard</h1>';
                      

        $.each(data, function(index, post) { 
            //html = html + JogLeaderboardView.postHtml(post);
            if (index >= JogLeaderboardView.configs.paginateSize) {
                enablePagination = true;
                return false;
            }
                
            html = html + '<div class="jog_data_posts_leaderboard_post_v2">';
            html = html + JogLeaderboardPanelView.leaderPostHtml(post);
            html = html + '</div>';
            

        });

        html = html + '</div>';

        if (enablePagination) {
            html = html + '<div id="jog_lbv_loadmore"></div>';
            JogLeaderboardView.updatePaginationPoint();
            JogLeaderboardPanelController.enablePagination();

        }
        $("#jog_data_container").append(html);
    },

    handleLoadMore: function() 
    {
        if (JogLeaderboardView.configs.dataLength <= JogLeaderboardView.configs.paginationPoint)
            $("#jog_lbv_loadmore").hide();
    },
    
    paginateLeaderboard: function()
    {

        function minVal(a,b)
        {
            return ( a < b) ? a : b;
        }

        var data = JOGCache.getData("leaderboardPosts", null);
        var minVal = minVal(JogLeaderboardView.configs.dataLength,JogLeaderboardView.configs.paginateSize)

        var size = JogLeaderboardView.configs.paginationPoint + JogLeaderboardView.configs.paginateSize;

        var paginateData = data.slice(JogLeaderboardView.configs.paginationPoint, size);

        var enablePagination = false;

        var html = "";

        $.each(paginateData, function(index, post) { 
            //html = html + JogLeaderboardView.postHtml(post);
            if (index >= JogLeaderboardView.configs.paginateSize) {
                enablePagination = true;
                return false;
            }
                
            html = html + '<div class="jog_data_posts_leaderboard_post_v2">';
            html = html + JogLeaderboardPanelView.leaderPostHtml(post);
            html = html + '</div>';
        });

        JogLeaderboardView.updatePaginationPoint();

        JogLeaderboardView.handleLoadMore();
        
        var ht = $("#jog_data_posts_leaderboard_list_v2").height();

        $("#jog_data_posts_leaderboard_list_v2").append(html);

        JOG.scrollAfterPagination(ht);

    },


    /* FIXME : DELETE THIS NOT USED */
    postHtml : function(data)
    {

        function userInfo()
        {
            return '<a href="'+JOG.getUserLink(data.user_uid)+'">'+
                     '<img src="'+data.user_pic+'">'+
                     '<span>'+data.user_name+'</span>'+
                    '</a>'; 
        }
        var loggedinUser = JOGCache.getData("loggedinUserData", null);

        function postHtml()
        {
            
            var html = (loggedinUser && data.user_uid == loggedinUser.uid) ? "" : '<div data-value="'+data.post_id+'" class="jog_leaderboard_list_post_list_vote_action jog_lb_vote_action"></div>';
            return '<div class="jog_data_post_vote_box">'+
                           '<div class="jog_js_leaderboard_vote_count jog_lb_vote_count" post-id="'+data.post_id+'">'+data.votes_count+' Votes</div>'+
                            html+
                       '</div>';  

        }     

        var truncateTextLength = (data.post_pic && data.post_pic !== "" ) ? 200 : 300; ;
        var imgHtml = (data.post_pic && data.post_pic !== "" ) ? '<img src="'+data.post_pic+'" align="right">' : ""; 

        var html = '<div class="jog_data_posts_leaderboard_list_box" >'+
                        '<div class="jog_data_posts_leaderboard_list_user_info">'+
                        userInfo()+
                        '</div>'+
                        '<div class="jog_data_posts_leaderboard_list_box_content">'+ 
                            '<h5 class="jog_date_format">'+new Date($.prettyDate.parse(data.time_stamp)).toDateString()+'</h5>'+
                            '<a href="'+JOG.getPostLink(data.post_id)+'">'+
                                '<h3 class="jog_data_posts_box_title">'+data.post_title +'</h3>'+
                            '</a>'+
                            '<div class="jog_data_posts_box_content">'+
                                imgHtml+
                                JOG.utils.truncateText(data.post_text,truncateTextLength) +
                            '</div>'+
                            postHtml()+
                            /*'<div class="jog_data_posts_leaderboard_list_box_metric">'+
                                '<div class="jog_data_posts_box_metric_vote_action"> Vote </div>'+
                                '<div class="jog_data_posts_box_metric_vote_count"> '+data.votes_count+' Votes  </div>'+
                            '</div>'+*/
                        '</div>'+
                    '</div>';
        
        return html;
    },

    updateVoteCountText: function(data)
    {
        var $this = $(".jog_js_leaderboard_vote_count[post-id="+data.id+"]");
     
        var text = data.votes_count + " Votes";

        $this.html(text);
        /* FIXME : BAD HACK, we need to have client cache updated in effective manner */
        var dataList = JOGCache.getData(currentUserPosts, null);
        $.each(dataList, function(index, list){
            if (data.id === list.id) {
                list.vote_count = data.votes_count;
                return false;
            }
        });
    },

    udpateAppMetric: function()
    {

    },
};



