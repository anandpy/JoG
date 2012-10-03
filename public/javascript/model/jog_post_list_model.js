var JogPostListModel = {

    init: function()
    {
        $.ajax({
                url: JOG.urls.fetchPosts,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: {"user_id" : JOG.configs.page_id},
                success: function ( data ) {
                    console.log("post data vote success"); 
                    console.log(data);
                    
                    JOGCache.setData("currentUserPosts", data);
                    JogDataPostListView.init(data);
                    
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
        });
    },

	deletePost: function(id, cat)
    {
        var type = cat || "user";

        var sendParam = (type == "admin") ? 
                        {
                          "post_id" : id, 
                          "user_id" : JOGCache.getData("loggedinUserData",null).id, 
                          "type": type, 
                          "key": $("#jog_admin_key").val(),
                        } :
                        {
                          "post_id" : id, 
                          "user_id" : JOGCache.getData("loggedinUserData",null).id, 
                          "type": type, 
                        } ;


        $.ajax({
                headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/x-www-form-urlencoded'},
                url: JOG.urls.deletePost,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                //data: {"post_id" : id, "user_id" : JOGCache.getData("loggedinUserData",null).id, "type": type},
                data : sendParam,
                success: function ( data ) {
                    console.log("post data vote success"); 
                    console.log(data);

                    if (type == "admin")   
                        JogUserSinglePostView.deletePostMessage("This post is deleted");
                    else    
                        JogDataPostListView.deletePostEntry(id);
                    
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    if (type == "admin")
                        JogUserSinglePostView.deletePostMessage("Not authorized to delete post");
                    console.log("error while retrieving user");
                }
          });
    },

    /* update vote for a particular vote */
    updateVote: function(data, type)
	{
		$.ajax({
			    headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/x-www-form-urlencoded'},
                url: JOG.urls.updateVoteCount,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: {"post_id" : data, "user_id": JOGCache.getData("loggedinUserData",null).id},
                success: function ( resdata ) {
                    console.log("post data vote success"); 
                    console.log(resdata);

                    if (type && type == "small")
                        JogLeaderboardPanelView.updateVoteCount(resdata);
                    else   
                        JogPostListModel.updateVoteCountView(resdata);
                    
                    //JogUserProfileInfoView.init(data);

                    //irisCacheApiSETData("iris.friends", data);
                    //$('#irisSearchOptionFriends').trigger('click');
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    JogPostListController.restrainDoubleVoting();
                }
          });
	},



    updateVoteCountView: function(data)
    {
        if (JOG.configs.page_title == "leaderboard") {
            JogLeaderboardView.updateVoteCountText(data);
            return;
        }
        JogDataPostListView.updateVoteCount(data);
    },

    

};