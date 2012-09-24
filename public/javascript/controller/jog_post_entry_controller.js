
var JogPostEntryController = {


	createPostParams: function(data)
	{
        var postParam = {};
                        
        postParam.title = $("#jog_data_post_entry_title").val();
        postParam.text = $("#jog_data_post_entry_text").val();
        postParam.imgSrc = "/123.png";
        postParam.userID = "123456789";

        JogPostEntryModel.createPost(postParam);

	},


};