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

        function userInfo()
        {
            return '<a href="/show/'+data.user_uid+'">'+
                        '<img src="'+data.user_pic+'">'+
                        '<span>'+data.user_name+'</span>'
                    '</a>';
        }

        var truncateTextLength = (data.post_pic && data.post_pic !== "" ) ? 200 : 300; ;
        var imgHtml = (data.post_pic && data.post_pic !== "" ) ? '<img src="'+data.post_pic+'" align="right">' : ""; 

        var html = '<div class="jog_data_posts_leaderboard_list_box" >'+
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
                                '<div class="jog_data_posts_box_metric_vote_count"> '+data.vote_count+' Votes  </div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        
        return html;
    },

    
};