


var JogLandingPostMetricView = {
 
    
	init:  function(data)
	{
		JogLandingPostMetricView.display(data);
	},

    display: function(data)
	{
		var html = "";
        html = data.post_count + " Entries, " + data.vote_count + " Votes";
        $("#jog_lp_metric_count").html(html);
        
	},

};


