


var JogLandingLeaderboardPanelView = {
 
    "config": {
        "panelViewCount" : 6,
    },


	init:  function(data)
	{
		JogLandingLeaderboardPanelView.display(data);
	},

    display: function(data)
	{
		var html = "";
        var itr = 0;
        $.each(data, function(index, leader) { 
            if (index > JogLandingLeaderboardPanelView.config.panelViewCount)
                return false;
  			html = html + JogLandingLeaderboardPanelView.leaderPostHtml(leader, index);
            JogLandingLeaderboardPanelController.addSlide();
		});
   
        $(".slides_container").html(html);
	},

	
    leaderPostHtml : function(data, index)
	{
		var html = "";
        
        var slide_hide_class = (index > 1) ? "slide_hide" : "no-class";
        
        html =      '<div class="jog_slider jog_lp_sp_main_container '+slide_hide_class+'" id="jog_lp_slide_index_'+index+'">'+  
                        '<div class="jog_lp_sp_user_name">'+
                            '<h5>'+data.user_name+'</h5>'+
                        '</div>'+
                        '<div class="jog_lp_sp_content">'+
                            '<div class="jog_lp_sp_leftside">'+
                                '<div class="jog_lp_sp_user_photo">'+
                                    '<img src="'+data.user_pic+'">'+
                                '</div>'+
                                '<div class="jog_lp_sp_vote">'+
                                    '<div class="jog_lp_sp_vote_count">'+data.votes_count+' Votes</div>'+
                                    //'<div class="jog_lp_sp_vote_action"></div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="jog_lp_sp_rightside">'+
                                '<a href="'+JOG.getPostLink(data.post_id)+'"><div class="jog_lp_sp_msg">'+JOG.utils.truncateText(data.post_title,18)+'</div></a>'+
                                '<p class="jog_lp_sp_text">'+JOG.utils.truncateText(data.post_text,100)+'</p>'+
                                '<div class="jog_lp_sp_by"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

    	return html;
	},

};


