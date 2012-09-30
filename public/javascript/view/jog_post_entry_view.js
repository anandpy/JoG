


var JogPostEntryView = {

    

	init:  function()
	{
        $("#jog_data_post_entry").remove();
		JogPostEntryView.display();
	},


	display: function(data)
	{
		var html = "";

        var user = JOGCache.getData("currentUserDetail",null);
        
        if (JOG.configs.page_title == "user_show_page") 
            var html = '<div id="jog_data_post_entry" style="border:none;background:none;">'+
                            '<div id="jog_data_post_entry_user_view">'+
                                '<img id="jog_data_post_entry_user_pic" src="'+user.pic+'">'+
                                '<span id="jog_data_post_entry_user_name">'+user.name+'</span>'+
                            '</div>'+
                        '</div>';
        else
            var html = '<div id="jog_data_post_entry">'+
                        '<div id="jog_data_post_entry_user_view">'+
                            '<img id="jog_data_post_entry_user_pic" src="'+user.pic+'">'+
                            '<span id="jog_data_post_entry_user_name">'+user.name+'</span>'+
                        '</div>'+
                        '<input type="text" id="jog_data_post_entry_title" placeholder="Title for the post" ></input>'+
                        '<h5 class="jog_data_post_entry_error">Title field cannot be empty </h5>'+
                        '<textarea id="jog_data_post_entry_text" style="resize: none;" cols="1000" rows="8" placeholder="Text" name="myTextarea"></textarea>'+
                        '<h5 class="jog_data_post_entry_error">Text field cannot be empty </h5>'+
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
                //alert(JSON.stringify(data)); 
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

