


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

        
        html = html + '<div id="jog_leader_board_side_panel">';

        html = html + header();

        html = html + '<div id="jog_leader_board_lists">';

        $.each(data.leaders, function(index, leader) { 
  			html = html + JogLeaderboardPanelView.leaderPostHtml(leader);
		});

        html = html + '</div></div>';

        $("#jog_leader_board_side_panel").html(html);

	},

	leaderPostHtml : function(data)
	{
		var html = "";
        
		html =  '<div class="jog_leader_board_entry">' +
    				'<div class="jog_leader_board_entry_data">' +
    					'<img src="'+data.image+'" align="left">'+
    				    data.postText+
    				'</div>'+
    				'<div class="jog_leader_board_entry_post_owner">'+
    					'<img src="'+data.postOwnerPic+'">'+
    					'<span>'+data.postOwner+'</span>'+
    					'<div class="jog_leader_board_entry_post_metric">'+
    						'<span>'+data.voteCount+' Votes</span>'+
    					'</div>'+
    				'</div>'+
    			'</div>';
    	return html;
	},

};

