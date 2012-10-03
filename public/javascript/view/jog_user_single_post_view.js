var JogUserSinglePostView = {

	init:  function(data)
	{
		JogUserSinglePostView.display(data);
    },

    display: function(data)
    {
        var html = "";
          
        html = html + '<div id="jog_data_posts_leaderboard_list">';

        html = html + JogUserSinglePostView.postHtml(data);
 
        html = html + '</div>';

        $("#jog_data_container").append(html);
    },

    postHtml : function(data)
    {

        var loggedinUser = JOGCache.getData("loggedinUserData", null);

        var truncateTextLength = (data.post_pic && data.post_pic !== "" ) ? 200 : 300; ;
        var imgHtml = (data.post_pic && data.post_pic !== "" ) ? '<img src="'+data.post_pic+'" align="right">' : ""; 

        var tipsyTitleClass = (data.post_title.length > 35) ? "enableTipsy" : "";
        var tipsyPostClass = (data.post_title.length > truncateTextLength) ? "enableTipsy" : "";


        function userInfo()
        {
            return '<a href="'+JOG.getUserLink(data.user_uid)+'">'+
                     '<img src="'+data.user_pic+'">'+
                     '<span>'+data.user_name+'</span>'+
                    '</a>'; 
        }

        function postHtml()
        {
            
            var html = (loggedinUser && data.user_uid == loggedinUser.uid) ? "" : '<div data-value="'+data.post_id+'" class="jog_leaderboard_list_post_list_vote_action jog_lb_vote_action"></div>';
            return '<div class="jog_data_post_vote_box">'+
                           '<div class="jog_js_leaderboard_vote_count jog_lb_vote_count" post-id="'+data.post_id+'">'+data.votes_count+' Votes</div>'+
                            html+
                       '</div>';  

        }     

        function adminLevelPrivilege()
        {   
            var html = "";
            
            var loggedinData = JOGCache.getData("loggedinUserData", null);

            if (loggedinData && JOGAdminUID.indexOf(loggedinData.uid) != -1 ) {
                var html = '<input type="text" id="jog_admin_key" placeholder="Secret Key"></input>';
                html = html + '<button class="btn btn-warning" id="jog_admin_delete" data-id="'+data.post_id+'"> Delete by Admin</button>';    
                html = html + '<div id="jog_post_deleted_by_admin"> This post is deleted </div>';
                html = html + '<div id="jog_admin_fetch_email">View Email</div>';
                html = html + '<div id="jog_admin_user_email"></div>';
            }
            
            return html;
        }

        

        var html = '<div class="jog_data_posts_leaderboard_list_box">'+

                        '<div class="jog_data_posts_leaderboard_list_user_info">'+
                        userInfo()+
                        '</div>'+
                        '<div class="jog_data_posts_leaderboard_list_box_content">'+ 
                            '<h5 class="jog_date_format">'+new Date($.prettyDate.parse(data.time_stamp)).toDateString()+'</h5>'+
                            '<a href="'+JOG.getPostLink(data.post_id)+'">'+
                                '<h3 class="jog_data_posts_box_title '+tipsyTitleClass+'" original-title="'+data.post_title+'">'+JOG.utils.truncateText(data.post_title, 35)+'</h3>'+
                            '</a>'+
                            '<div class="jog_data_posts_box_content">'+
                                imgHtml+
                                data.post_text+
                                //JOG.utils.truncateText(data.post_text,truncateTextLength) +
                            '</div>'+
                            postHtml()+
                        '</div>'+
                        adminLevelPrivilege()+
                    '</div>';
        
        return html;
    },

    deletePostMessage: function(message)
    {
       $("#jog_post_deleted_by_admin").text(message).show();
    },

    post1Html : function(data)
    {

        function userInfo()
        {
            return '<a href="/show/'+data.user_uid+'">'+
                        '<img src="'+data.user_pic+'">'+
                        '<span>'+data.user_name+'</span>'+
                    '</a>';
        }

        var truncateTextLength = (data.post_pic && data.post_pic !== "" ) ? 200 : 300; ;
        var imgHtml = (data.post_pic && data.post_pic !== "" ) ? '<img src="'+data.post_pic+'" align="right">' : ""; 

        var html = '<div class="jog_data_posts_leaderboard_list_box"  >'+
                        '<div class="jog_data_posts_leaderboard_list_user_info">'+
                        userInfo()+
                        '</div>'+
                        '<div class="jog_data_posts_leaderboard_list_box_content">'+ 
                            '<h5>2nd Oct 2012</h5>'+
                            '<h3 class="jog_data_posts_box_title">'+data.post_title +'</h3>'+
                            '<div class="jog_data_posts_box_content">'+
                                imgHtml+
                                JOG.utils.truncateText(data.post_text,truncateTextLength) +
                            '</div>'+
                            '<div class="jog_data_posts_leaderboard_list_box_metric">'+
                                '<div class="jog_data_posts_box_metric_vote_action"> Vote </div>'+
                                '<div class="jog_data_posts_box_metric_vote_count"> '+data.votes_count+' Votes  </div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        
        return html;
    },

    
};