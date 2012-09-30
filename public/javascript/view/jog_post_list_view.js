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

    addPostEntry: function(data, user)
    {
        var html = JogDataPostListView.postHtml(data, user );

        $("#jog_data_posts_list").prepend(html);

    },

    postHtml : function(data, user)
    {
        var imgHtml = (data.pic && data.pic !== "" ) ? '<img src="'+data.pic+'" align="right">' : "";  

        var postHtml = (user && data.user_uid == user.uid) ? "" : 
                            '<div class="jog_data_posts_box_metric_vote_action" post-id="'+data.id+'">'+
                                 '<img src="/resources/heart.png">'+
                                 '<span>Vote</span>'+
                            '</div>';

        var html = '<div class="jog_data_posts_box" data-post-id="'+data.id+'" data-post-userid="'+data.user_id+'">'+
                        '<h3 class="jog_data_posts_box_title">'+data.title +'</h3>'+
                        '<div class="jog_data_posts_box_content">'+
                            imgHtml+
                            JOG.utils.truncateText(data.text, 300)+
                        '</div>'+
                        '<div class="jog_data_posts_box_metric">'+
                            postHtml+
                            '<div class="jog_data_posts_box_metric_vote_count" post-id="'+data.id+'"> '+data.vote_count+' Votes  </div>'+
                        '</div>'+
                        JogDataPostListView.socialShareHtml(data)+
                    '</div>';
        
        return html;
    },

    updateVoteCount: function(data)
    {
        var $this = $(".jog_data_posts_box_metric_vote_count[post-id="+data.id+"]");
     
        var text = data.vote_count + " Votes";

        $this.html(text);

        /* FIXME : BAD HACK, we need to have client cache updated in effective manner */
        var dataList = JOGCache.getData(currentUserPosts, null);
        $.each(dataList, function(index, list){
            if (data.id === list.id) {
                list.vote_count = data.vote_count;
                return false;
            }
        });
    }, 

    socialShareHtml: function(data)
    {

        var shareURL = "http://www.makemytrip.com";
        
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
                            '<div class="jog_data_posts_box_metric_vote_count"> '+data.vote_count+' Votes  </div>'+
                        '</div>'+
                        JogDataPostListView.socialShareHtml(data)+
                   '</div>';

        $("#jog_detail_post_view_modal").html(html);
    },
};

