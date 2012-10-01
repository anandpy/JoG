var JogDataPostListView = {

	init:  function(data)
	{
		JogDataPostListView.display(data);
	},

	display: function(data)
	{
		var html = "";
        var user = JOGCache.getData("currentUserDetail",null);

        html = html + '<div id="jog_data_posts_list">';

        $.each(data, function(index, post) { 
            html = html + JogDataPostListView.postHtml(post,user);
        });

        html = html + '</div>';

        $("#jog_data_panel").append(html);

    },

    deletePostEntry: function(id)
    {
        $("#jog_post_list_id_"+id).remove();
    },


    addPostEntry: function(data, user)
    {
        var html = JogDataPostListView.postHtml(data, user );

        $("#jog_data_posts_list").prepend(html);

    },

    postHtml : function(data, user)
    {
        var imgHtml = (data.pic && data.pic !== "" ) ? '<img src="'+data.pic+'" align="right">' : "";  
        var loggedinUser = JOGCache.getData("loggedinUserData", null);
        
        var tipsyTitleClass = (data.title.length > 30) ? "enableTipsy" : "";

        function postHtml()
        {
            
            var html = (loggedinUser && data.user_uid == loggedinUser.uid) ? "" : '<div data-value="'+data.id+'" class="jog_data_post_list_vote_action jog_lb_vote_action"></div>';
            return '<div class="jog_data_post_vote_box">'+
                           '<div class="jog_lb_vote_count" post-id="'+data.id+'">'+data.votes_count+' Votes</div>'+
                           //'<div data-value="'+data.id+'" class="jog_data_post_list_vote_action jog_lb_vote_action"></div>'+
                           html+
                       '</div>';  

        }                    
      
        function deletePostHtml()
        {
            if (JOG.configs.page_title == "leaderboard" 
                || JOG.configs.page_title == "user_show_page"
                || JOG.configs.page_title == "post_show_page")
                return "";

            if (user && data.user_uid == user.uid)
                return  '<div data-value="'+data.id+'" class="jog_data_post_delete">Delete Post</div>';
            else
                return "";
        }

        var html = '<div id="jog_post_list_id_'+data.id+'" class="jog_data_posts_box" data-post-id="'+data.id+'" data-post-userid="'+data.user_id+'">'+
                        '<div class="jog_data_posts_box_time">'+JOG.prettifyTimeStamps(data.created_at)+'</div>'+
                        '<a href="'+JOG.getPostLink(data.id)+'"><h3 class="jog_data_posts_box_title '+tipsyTitleClass+'" original-title="'+data.title+'">'+
                                JOG.utils.truncateText(data.title, 30)+'</h3></a>'+
                        '<div class="jog_data_posts_box_content">'+
                            imgHtml+
                            JOG.utils.truncateText(data.text, 300)+
                        '</div>'+
                        '<div class="jog_data_posts_box_metric">'+
                            postHtml()+
                            //'<div class="jog_data_posts_box_metric_vote_count" post-id="'+data.id+'"> '+data.votes_count+' Votes  </div>'+
                        '</div>'+
                        deletePostHtml()+
                        JogDataPostListView.socialShareHtml(data)+
                    '</div>';
        
        return html;
    },

    updateVoteCount: function(data)
    {
        var $this = $(".jog_lb_vote_count[post-id="+data.id+"]");
     
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

    socialShareHtml: function(data)
    {

        var shareURL = JOG.appUrl() + "/post/1";
        
        function fbHtml()
        {
            return '<div class="fb-send" data-href="'+shareURL+'" data-font="lucida grande"></div>';
        }

        function twitterHtml()
        {
            return '<a href="https://twitter.com/share" class="twitter-share-button" data-url="'+shareURL+'" data-via="makemytrip" data-text="vote for me to win free tickets" data-lang="en">Tweet</a>'+
            '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';

        }

        var html = '<div class="jog_data_posts_box_social_share">';
        html = html + '<div class="jog_posts_box_social_share_container">' + fbHtml() + '</div>';
        html = html + '<div class="jog_posts_box_social_share_container">' + twitterHtml() + '</div>';
        html = html + '</div>';
        return html;

    },
};




/* WILL GET OPEN WHEN USER CLICK FOR DETAIL VIEW */
var JogDataPostDetailView = {

    init: function(data)
    {
        JogDataPostDetailView.display(data);
    },

    display: function(data)
    {
        var imgHtml = (data.pic && data.pic !== "" ) ? '<img src="'+data.pic+'">' : "";  

        var html = '<div id="jog_post_detail_view">'+
                        '<h3 id="jog_post_detail_view_title">'+data.title+'</h3>'+
                        '<div id="jog_post_detail_content">'+
                            imgHtml+
                            '<p>'+data.text+'</p>'+
                        '</div>'+
                        '<div id="jog_data_posts_detail_box_metric">'+
                            '<div class="jog_data_posts_box_metric_vote_action"> Vote </div>'+
                            '<div class="jog_data_posts_box_metric_vote_count"> '+data.votes_count+' Votes  </div>'+
                        '</div>'+
                        JogDataPostListView.socialShareHtml(data)+
                   '</div>';

        $("#jog_detail_post_view_modal").html(html);
    },
};

