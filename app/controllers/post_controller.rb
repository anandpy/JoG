class PostController < ApplicationController

	################################################################################################
	# INPUT => MANDATORY ONES
	# 
	################################################################################################# 
	def create_post
		Rails.logger.info("[CNTRL] [POST] [CREATE] New post create requested") 
		Rails.logger.info("[CNTRL] [POST] [CREATE] params #{params.inspect}") 	
	end


	################################################################################################
    #
    #
    #
    ################################################################################################# 
    def get_posts
        Rails.logger.info("[CNTRL] [HOME] [get_posts] enter #{params}");
        if !user_signed_in? 
          Rails.logger.error("[CNTRL] [HOME] [get_posts] ****USER NOT LOGGED IN****")
          render :json => {:error => "No user loggedin" }, :status => 400
        end

        #Rails.logger.info("[HOME] [COMMON] current user id #{session[:current_user_id]}")
        Rails.logger.info("[HOME] [COMMON] current user id #{current_user.id}")

        response_json = Post.where(:user_id => current_user_id) 

        if request.xhr?
            #Rails.logger.debug("[CNTRL] [HOME] [get_locations] Return:#{response_json.inspect}")
            expires_in 10.minutes
            render :json => response_json
            return
        end

        Rails.logger.info("[CNTRL] [HOME] [get_locations] leave");
    end


end