

var JogLandingPostMetricModel = {

	getPostMetric : function()
	{
		$.ajax({
                url: JOG.urls.postMetric,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: $("#cookie_val").val(),
                success: function ( data ) {
                    console.log("post metric success"); 
                    console.log(data);
                    
                    JOGCache.setData("leaderboardPosts", data);
                    JogLandingPostMetricModel.updateView(data);
                    
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
        });
	},

    updateView : function(data)
    {
        JogLandingPostMetricView.init(data);
    },

};

