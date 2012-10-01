


var JogAllPostsView = {

    init:  function(data)
    {
        JogAllPostsView.display(data);
        JogAllPostsView.showLeaderboardLink();
    },

    showLeaderboardLink: function()
    {
        $("#jog_js_dynnav_link").html('<a href="/leaderboard"><div id="jog_view_timeline_posts">| View Leaderboard</div></a>')
        
    },

    display: function(data)
    {
        var html = "";
          
        html = html + '<div id="jog_data_posts_leaderboard_list_v2">' +
                        '<h1>Recent Posts</h1>';
                      

        $.each(data, function(index, post) { 
            //html = html + JogLeaderboardView.postHtml(post);
            html = html + '<div class="jog_data_posts_leaderboard_post_v2">';
            html = html + JogAllPostsView.postHtml(post);
            html = html + '</div>';

        });

        html = html + '</div>';

        $("#jog_data_container").append(html);
    },

    

    postHtml : function(data)
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
