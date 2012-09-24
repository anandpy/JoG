var JogDataPostListView = {

	init:  function(data)
	{
		JogDataPostListView.display(data);
	},

	display: function(data)
	{
		var html = "";
          
        html = html + '<div id="jog_data_posts_list">';

        $.each(data, function(index, post) { 
            html = html + JogDataPostListView.postHtml(post);
        });

        html = html + '</div>';

        $("#jog_data_panel").append(html);

    },

    postHtml : function(data)
    {

        var html = '<div class="jog_data_posts_box" data-post-id="'+data.id+'" data-post-userid="'+data.user_id+'">'+
                        '<h3 class="jog_data_posts_box_title">'+data.title +'</h3>'+
                        '<div class="jog_data_posts_box_content">'+
                            '<img src="'+data.pic+'" align="right">'+
                             JOG.utils.truncateText(data.text, 300)+
                        '</div>'+
                        '<div class="jog_data_posts_box_metric">'+
                            '<div class="jog_data_posts_box_metric_vote_action" post-id="1"> Vote </div>'+
                            '<div class="jog_data_posts_box_metric_vote_count"> '+data.vote_count+' Votes  </div>'+
                        '</div>'+
                        JogDataPostListView.socialShareHtml(data)+
                    '</div>';
        
        return html;
    },

    socialShareHtml: function(data)
    {
        var html = '<div class="jog_data_posts_box_social_share">';
        html = html + '<div class="fb-send" data-href="http://example.com" data-font="lucida grande"></div>';
        html = html + '<a href="https://twitter.com/share" class="twitter-share-button" data-url="https://makemytrip.com" data-via="makemytrip" data-text="vote for me to win free tickets" data-lang="en">Tweet</a>'+
            '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';

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
        var html = '<div id="jog_post_detail_view">'+
                        '<h3 id="jog_post_detail_view_title">'+data.title+'</h3>'+
                        '<div id="jog_post_detail_content">'+
                            '<img src="'+data.image+'">'+
                             '<p>'+data.postText+'</p>'+
                        '</div>'+
                        '<div id="jog_data_posts_detail_box_metric">'+
                            '<div class="jog_data_posts_box_metric_vote_action"> Vote </div>'+
                            '<div class="jog_data_posts_box_metric_vote_count"> '+data.voteCount+' Votes  </div>'+
                        '</div>'+
                        JogDataPostListView.socialShareHtml(data)+
                   '</div>';

        $("#jog_detail_post_view_modal").html(html);
    },
};

