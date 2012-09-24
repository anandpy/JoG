


var JogLeaderboardPanelView = {
 

	init:  function(data)
	{
		JogLeaderboardPanelView.display(data);
	},

	display: function(data)
	{
		var html = "";

        
        function header()
        {
        	var headerHtml = "<h3>Leaderboard</h3>";
        	return headerHtml;	
        }

        
        html = html + header();

        html = html + '<div id="jog_leader_board_lists">';

        $.each(data, function(index, leader) { 
  			html = html + JogLeaderboardPanelView.leaderPostHtml(leader);
		});

        html = html + '</div>';

        $("#jog_leader_board_side_panel").html(html);

	},

	leaderPostHtml : function(data)
	{
		var html = "";
         
        var imgHtml = (data.post_pic && data.post_pic !== "" ) ? '<img src="'+data.post_pic+'" align="left">' : "";  

		html =  '<div class="jog_leader_board_entry">' +
    				'<div class="jog_leader_board_entry_data">' +
    					imgHtml+
    				    JOG.utils.truncateText(data.post_text,120) +
    				'</div>'+
    				'<div class="jog_leader_board_entry_post_owner">'+
    					'<img src="'+data.user_pic+'">'+
    					'<span>'+data.user_name+'</span>'+
    					'<div class="jog_leader_board_entry_post_metric">'+
    						'<span>'+data.vote_count+' Votes</span>'+
    					'</div>'+
    				'</div>'+
    			'</div>';
    	return html;
	},

};


var JogLeaderboardView = {
 

    init:  function(data)
    {
        JogLeaderboardView.display(data);
    },

    display: function(data)
    {
        var html = "";
          
        html = html + '<div id="jog_data_posts_leaderboard_list">';

        $.each(data.posts, function(index, post) { 
            html = html + JogLeaderboardView.postHtml(post);
        });

        html = html + '</div>';

        $("#jog_data_container").append(html);
    },

    

    postHtml : function(data)
    {

        function userInfo()
        {
            return '<img src="'+data.postOwnerPic+'">'+
                   '<span>'+data.postOwner+'</span>';
        }

        var html = '<div class="jog_data_posts_leaderboard_list_box">'+
                        '<div class="jog_data_posts_leaderboard_list_user_info">'+
                        userInfo()+
                        '</div>'+
                        '<div class="jog_data_posts_leaderboard_list_box_content">'+ 
                            '<h5>'+data.date+'</h5>'+
                            '<h3 class="jog_data_posts_box_title">'+data.title +'</h3>'+
                            '<div class="jog_data_posts_box_content">'+
                                '<img src="'+data.image+'" align="right">'+
                                data.postText+
                            '</div>'+
                            '<div class="jog_data_posts_box_metric">'+
                                '<div class="jog_data_posts_box_metric_vote_action"> Vote </div>'+
                                '<div class="jog_data_posts_box_metric_vote_count"> '+data.voteCount+' Votes  </div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        
        return html;
    },
};



