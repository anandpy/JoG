
var JogPostListController = {


	postVoteUpdate: function(obj)
	{

        var data = {};

        data.postID = obj.attr("post-id");
        //var currentUserCredentials = JOGCache.getData("")

		JogPostListModel.updateVote(data);
	},

};

