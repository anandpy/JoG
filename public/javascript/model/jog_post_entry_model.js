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
            name: 'I just entered the MakeMyTrip – Joy of Giving contest',
            //link: 'http://www.facebook.com/makemytrip/app_124803241001108',
            //link: 'http://apps.facebook.com/367153893359066/?fb_source=search&ref=ts&fref=ts',
            link :  'https://apps.facebook.com/joy-app/?utm_source=app_vote_fshare',
            picture: "https://s3.amazonaws.com/jogw/mmt_share.jpg",
            //caption: 'Check out my entry, vote and share your Joy in Giving too!',
            //description: 'I have uploaded my entry to the Joy of Giving contest, Vote for me and share your Joy in Giving too!',
            caption: 'Check out my entry, vote and share your Joy in Giving too!',
            //message: 'I just participated in MakeMyTrip – Joy of Giving contest'
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
