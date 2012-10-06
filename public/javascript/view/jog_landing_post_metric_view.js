


var JogLandingPostMetricView = {
 
    
	init:  function(data)
	{
		JogLandingPostMetricView.display(data);
	},

    display: function(data)
	{
		var html = "";
        html = data.post_count + " Entries, " + data.votes_count + " Votes";
        $("#jog_user_metric").html(html);
        /*
        if (JOG.configs.page_title == "leaderboard" 
            || JOG.configs.page_title == "post_show_page"
            || JOG.configs.page_title == "all_posts")
        	$("#jog_user_metric").html(html);
        else
        	$("#jog_lp_metric_count").html(html);
        */
 	},


};


