
var JogPostEntryController = {

    init: function()
    {
    	JogPostEntryController.initEvents();
    },

	createPostParams: function(data)
	{
        var postParam = {};

        var $title = $("#jog_data_post_entry_title");
        var $text = $("#jog_data_post_entry_text");
      
        var valid = 1;

        postParam.title = $title.val();
        postParam.text = $text.val();
        postParam.imgSrc = JogPostEntryModel.filepick.url;
        postParam.userID = "123456789";

        if (postParam.title === "") {
            $title.next().slideToggle();
            valid = 0;
        }
        if (postParam.text === "") {
            $text.next().slideToggle();
            valid = 0;
        } 
       
        if (valid)
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