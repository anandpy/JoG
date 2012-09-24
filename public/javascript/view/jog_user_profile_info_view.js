var JogUserProfileInfoView = {

	init:  function(data)
	{
		JogUserProfileInfoView.display(data);
	},

	display: function(data)
	{
		var html = '<div id="jog_user_profile_data">'+
                        '<div id="jog_user_profile_img">'+
                            '<img src="'+data.image+'">'+
                        '</div>'+
                        '<div id="jog_user_profile_name">'+
                            '<span>'+data.name+'</span>'+
                        '</div>'+
                        '<div id="jog_user_profile_post_count">'+
                            '<span id="jog_user_profile_post_count_num">'+data.postCount+'</span>'+
                            '<span> Posts</span>'+
                        '</div>'+
                    '</div>';

        $("#jog_main_container").prepend(html);

    },

    
};