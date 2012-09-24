var JogPostListModel = {


	

    /* update vote for a particular vote*/
    updateVote: function(data)
	{
		$.ajax({
			    headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/x-www-form-urlencoded'},
                url: JOG.urls.updateVoteCount,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: data,
                success: function ( data ) {
                    console.log("post data vote success"); 
                    console.log(data);
                    
                    //JogUserProfileInfoView.init(data);

                    //irisCacheApiSETData("iris.friends", data);
                    //$('#irisSearchOptionFriends').trigger('click');
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while retrieving user");
                }
          });
	},

    

};