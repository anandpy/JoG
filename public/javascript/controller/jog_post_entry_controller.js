
var JogPostEntryController = {

    init: function()
    {
    	JogPostEntryController.initEvents();
    },

	createPostParams: function(data)
	{
        var postParam = {};
                        
        postParam.title = $("#jog_data_post_entry_title").val();
        postParam.text = $("#jog_data_post_entry_text").val();
        postParam.imgSrc = JogPostEntryModel.filepick.url;
        postParam.userID = "123456789";

        JogPostEntryModel.createPost(postParam);

        
	},

    initEvents: function()
    {
		$("#jog_data_post_entry_actions_init_button").live("click",function(){
    		JogPostEntryView.toggleFilePickView();
    	});

    	$("#jog_cancel_img_preview").live("click", function(){
    		JogPostEntryModel.deleteUpload();
    	}); 

    	$("#jog_data_post_entry_action_submit").live("click", function(e){
            JogPostEntryController.createPostParams();    
            e.preventDefault();
        });	
  	
    }


};