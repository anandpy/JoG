var JogPostEntryModel = {
    
    "filepick" : {},
    
    createPost: function(data)
    {
         //alert(JSON.stringify(data));
         $.ajax({
                headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/x-www-form-urlencoded'},
                url: JOG.urls.postUrl,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: data,
                success: function ( data ) {
                    console.log(data);
                    JogPostEntryView.init();
                    JogPostEntryModel.postToFBWall(data);
                    JogDataPostListView.addPostEntry(data, JOGCache.getData("currentUserDetail",null));
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while creating post");
                }
          });
    },

    postToFBWall: function(data)
    {

        var status = "JoGW is around, what are your plans?";
        
        FB.ui(
        {
            method: 'feed',
            name: 'Joy of Giving - a chance to win free tickets by MakeMyTrip',
            link: JOG.appUrl(),
            picture: JOG.appUrl() + "/images/mmt_logo.png",
            caption: 'Joy of Giving',
            description: 'I just uploaded an entry to the Joy of Giving content,'+JOG.appUrl()+' , Vote for your friends at Joy of Giving Contest and help them win free tickets',
            message: 'Joy of Giving - a chance to win free tickets by MakeMyTrip'
        }, function(response) {
            if (response && response.post_id) {
                console.log("FB post not published");
                //alert('Post was published.');
            } else {   
                //alert('Post was not published.');
                console.log("FB post published");
            }
        }
        );

        /*FB.api('/me/feed', 'post', { message: status }, function(response) {
            if (!response || response.error) {
                console.log(response.error);
                alert('Error occured');
            } else {
                alert('Status updated Successfully');
            }
        });
        */
        /*
        FB.ui(
        {
            method: 'stream.publish',
            message: 'Hi there, JoGw is around, whats your plan',
            //user_message_prompt: 'Share your thoughts about Connect'
        }, function(response) {
                if (response && response.post_id) {
                    //alert('Post was published.');
                } else {
                    //alert('Post was not published.');
                }
            }
        );*/
    },

    deleteUpload : function() {
        var fileUrl = JogPostEntryModel.filepick.url;

        filepicker.revokeFile(fileUrl, function(success, message){
            //alert(message);
            JogPostEntryModel.filepick = {};
            JogPostEntryView.cancelUpload();
        });        



    },

};
