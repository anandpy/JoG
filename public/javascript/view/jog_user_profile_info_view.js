var JogUserProfileInfoView = {

	init:  function(data)
	{
		//JogUserProfileInfoView.display(data);
        JogUserProfileInfoView.displayPostMetric(data);
        JogUserProfileInfoView.displayProfileInfo(data);
	},

    displayProfileInfo: function(data)
    {
        var html = '<a href="/"><img id="jog_user_profile_image_v2" src="'+data.pic+'">'+
                   '<h4 id="jog_user_profile_name_v2">'+data.name+'</h4></a>';

        $("#jog_user_info_v2").prepend(html);           
    },

    displayPostMetric: function(data)
    {
        var html = '<span>'+data.post_count+' Entries, '+data.votes_count+' Votes</span>';
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
                            '<span id="jog_user_profile_post_count_num">'+data.votes_count+'</span>'+
                            '<span> Posts</span>'+
                        '</div>'+
                    '</div>';

        //$("#jog_data_panel").prepend(html);

    },

    
};