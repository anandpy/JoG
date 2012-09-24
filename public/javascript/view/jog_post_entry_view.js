


var JogPostEntryView = {

	init:  function()
	{
		JogPostEntryView.display();
	},

	display: function(data)
	{
		var html = "";

        
        var html = '<div id="jog_data_post_entry">'+
                        '<input type="text" id="jog_data_post_entry_title"></input>'+
                        '<textarea id="jog_data_post_entry_text" style="resize: none;" cols="1000" rows="8" name="myTextarea"></textarea>'+
                        '<div id="jog_data_post_entry_attach_photo">'+
                            '<div>'+
                                '<input type="file" onchange="if (this.value) {filepicker.uploadFile(this, function(data){alert(JSON.stringify(data)); });}" style="margin-bottom: 0">'+
                                '<img alt="Loading..." src="https://filepicker_static.s3.amazonaws.com/c1d1fae/img/throbber.gif" class="hide" id="localSpinner" style="display: none;">'+
                            '</div>'+
                            '<img src="../resources/upload_photo.png">'+
                            '<button type="submit" class="btn btn-mini btn-info">Attach Photo</button>'+
                        '</div>'+
                        '<div id="jog_data_post_entry_actions">'+
                            '<button id="jog_data_post_entry_action_submit" type="submit" class="btn btn-success">Share Joy of Giving</button>'+
                        '</div>'+
                    '</div>';

        $("#jog_data_panel").prepend(html);

	},
};

