var JogUserProfileInfoView = {

	init:  function(data)
	{
		JogUserProfileInfoView.display(data);
        JogUserProfileInfoView.displayPostMetric(data);
	},

    displayPostMetric: function(data)
    {
        var html = '<span>'+data.post_count+' Entries, '+data.vote_count+' Votes</span>';
        $("#jog_user_metric").html(html);
    },

	display: function(data)
	{
		var html = '<div id="jog_user_profile_data">'+
                        '<div id="jog_user_profile_img">'+
                            '<img src="'+data.pic+'">'+
                        '</div>'+
                        '<div id="jog_user_profile_name">'+
                            '<span>'+data.name+'</span>'+
                        '</div>'+
                        '<div id="jog_user_profile_post_count">'+
                            '<span id="jog_user_profile_post_count_num">'+data.vote_count+'</span>'+
                            '<span> Posts</span>'+
                        '</div>'+
                    '</div>';

        $("#jog_main_container").prepend(html);

    },

    
};