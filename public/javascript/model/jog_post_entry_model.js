var JogPostEntryModel = {
    
    "filepick" : {},
    
    createPost: function(data)
    {
         alert(JSON.stringify(data));
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
                    JogDataPostListView.addPostEntry(data);
                },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                    // TODO: WHAT TO DO!!
                    console.log("error while creating post");
                }
          });
    },

    deleteUpload : function() {
        var fileUrl = JogPostEntryModel.filepick.url;

        filepicker.revokeFile(fileUrl, function(success, message){
            alert(message);
            JogPostEntryModel.filepick = {};
            JogPostEntryView.cancelUpload();
        });        



    },

};
