var JogLandingLeaderboardPanelController = {


    slideConfig : {
    	total: 0,
    	current : 0,
    },

    addSlide: function()
    {
    	JogLandingLeaderboardPanelController.slideConfig.total++;
    },

    updateNextSlideIndex: function()
    {
    	if ( JogLandingLeaderboardPanelController.slideConfig.current < JogLandingLeaderboardPanelController.slideConfig.total-1)
    		JogLandingLeaderboardPanelController.slideConfig.current++;
    	else
    		JogLandingLeaderboardPanelController.slideConfig.current = 0;
    },

    updatePrevSlideIndex: function()
    {
    	if ( JogLandingLeaderboardPanelController.slideConfig.current >= 0)
    		JogLandingLeaderboardPanelController.slideConfig.current--;
    	else
    		JogLandingLeaderboardPanelController.slideConfig.current = JogLandingLeaderboardPanelController.slideConfig.total-1;
    },

	init: function()
	{

		JogLandingLeaderboardPanelModel.getPosts();
		JogLandingLeaderboardPanelController.initEvents();
	},

	initEvents: function()
	{
		$("#jog_lp_slide_prev").live("click", function(){
			var $currentSlide = $("#jog_lp_slide_index_"+JogLandingLeaderboardPanelController.slideConfig.current);
			$currentSlide.removeClass("no-class").addClass("slide_hide");

			JogLandingLeaderboardPanelController.updatePrevSlideIndex();

			var $currentSlide = $("#jog_lp_slide_index_"+JogLandingLeaderboardPanelController.slideConfig.current);
			$currentSlide.removeClass("slide_hide").addClass("no-class");


		});

		$("#jog_lp_slide_next").live("click", function(){
			var $currentSlide = $("#jog_lp_slide_index_"+JogLandingLeaderboardPanelController.slideConfig.current);
			$currentSlide.removeClass("no-class").addClass("slide_hide");

			JogLandingLeaderboardPanelController.updateNextSlideIndex();

			var $currentSlide = $("#jog_lp_slide_index_"+JogLandingLeaderboardPanelController.slideConfig.current);
			$currentSlide.removeClass("slide_hide").addClass("no-class");


		});
	},

};

