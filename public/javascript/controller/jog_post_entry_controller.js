
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
        var $cat = $("#jog_data_post_entry_select_cat_val");
      
        var valid = 1;

        postParam.title = $title.val();
        postParam.text = $text.val();
        postParam.cat = $cat.val();
        postParam.imgSrc = JogPostEntryModel.filepick.url;
        postParam.userID = JOGCache.getData("currentUserDetail",null).uid;

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