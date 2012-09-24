


var JogPostEntryView = {

    

	init:  function()
	{
		JogPostEntryView.display();
	},


	display: function(data)
	{
		var html = "";

        
        var html = '<div id="jog_data_post_entry">'+
                        '<h3>Share your Joy of Giving, and participate in a chance to win free air ticket</h3>'+
                        '<input type="text" id="jog_data_post_entry_title" placeholder="Title for the post" ></input>'+
                        '<textarea id="jog_data_post_entry_text" style="resize: none;" cols="1000" rows="8" placeholder="Text" name="myTextarea"></textarea>'+
                         '<div id="jog_data_post_entry_actions_init">'+
                            '<div id="jog_data_post_entry_actions_init_button">'+
                                '<img src="/resources/upload_photo.png">'+
                                '<span>Add Photo</span>'+
                            '</div>'+
                            '<div id="jog_data_post_entry_attach_photo">'+
                                '<input type="file" onchange="if (this.value) {JogPostEntryView.imgUploadProcess(this);}" style="margin-bottom: 0">'+
                                '<img alt="Loading..." src="https://filepicker_static.s3.amazonaws.com/c1d1fae/img/throbber.gif"  id="jog_img_upload_spinner">'+
                            '</div>'+
                        '</div>'+
                        '<div id="jog_img_upload_preview">'+
                                '<img src="">'+
                                '<button id="jog_cancel_img_preview" class="btn btn-warn" value="Cancel">Delete Image</button>'+
                        '</div>'+
                        '<div id="jog_data_post_entry_actions">'+
                            '<button id="jog_data_post_entry_action_submit" type="submit" class="btn btn-success">Share Joy of Giving</button>'+
                        '</div>'+
                    '</div>';

        $("#jog_data_panel").prepend(html);
	},


    imgUploadProcess: function(obj)
    {
        var $loadSpin = $("#jog_img_upload_spinner");
        var $imgPreview = $("#jog_img_upload_preview");

        $loadSpin.show();

        if (obj.value) {
            filepicker.uploadFile(obj, function(data){
                JogPostEntryView.filepick = data;
                $imgPreview.find("img").attr("src",data.url);
                $imgPreview.show();
                console.log(data);
                alert(JSON.stringify(data)); 
                $loadSpin.hide();
                JogPostEntryModel.filepick = data;
            });
        }
    },

    cancelUpload: function()
    {
        $("#jog_img_upload_preview").hide();
        JogPostEntryView.toggleFilePickView();
    },

    toggleFilePickView : function()
    {
        $("#jog_data_post_entry_attach_photo").toggle();
    },
};

