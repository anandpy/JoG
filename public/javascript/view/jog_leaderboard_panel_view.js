


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

        html = html + 
               '<a href="/leaderboard">'+
               '<button id="jog_view_full_leaderboard" class="btn btn-info" value="View All">View All</button>'+
               '</a>';

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
          
        html = html + '<div id="jog_data_posts_leaderboard_list">' +
                      '<h1>Leaderboard</h1>';

        $.each(data, function(index, post) { 
            html = html + JogLeaderboardView.postHtml(post);
        });

        html = html + '</div>';

        $("#jog_data_container").append(html);
    },

    

    postHtml : function(data)
    {

        function userInfo()
        {
            return '<img src="'+data.user_pic+'">'+
                   '<span>'+data.user_name+'</span>';
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



