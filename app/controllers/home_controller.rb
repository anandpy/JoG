class HomeController < ApplicationController

	################################################################################################
	# INPUT => MANDATORY ONES
	#  { :srv => "facebook" , :srv_uid => "1234444", :access_token => "ADFFSFFjhjjhjjhjhj.."
	################################################################################################# 
	def index
		Rails.logger.info("[CNTRL] [HOME] [INDEX] New App Main Page requested")

		@page_mode = "iris_pg_mode_index" 
		if user_signed_in?
		  Rails.logger.error("[CNTRL] [HOME] [INDEX] *****DETECTED USER***** #{current_user.inspect}")
		  redirect_to current_user
		else
		  Rails.logger.info("[CNTRL] [HOME] [INDEX] ****USER NOT LOGGED IN****")
		  respond_to { |format|
		    format.html
		  }

		end
	end

	################################################################################################
	#
	#
	#
	################################################################################################# 
	def show
		Rails.logger.info("[CNTRL] [HOME] [SHOW] Entering")

		if !user_signed_in? 
		  redirect_to '/'
		end

		#only to test
		#TODO Remove these 6 lines
		#    hash = HomeHelper::get_json
		#    result = ::Api::create_totem(hash)
		#test ends

		Rails.logger.info("[CNTRL] [HOME] [SHOW] Leaving")

	rescue => e
		Rails.logger.error("[CNTRL] [HOME] [SHOW] ****RESCUE**** #{e.message}")
		render :json => {:error => e.message }, :status => 400
	end

	################################################################################################
	#
	#
	#
	################################################################################################# 
	def get_current_user_details
	    Rails.logger.info("[HOME] [get_current_user_details] Entering #{params}")
	  if !user_signed_in? 
	    Rails.logger.error("[CNTRL] [HOME] [get_current_user_details] ****USER NOT LOGGED IN****")
	    render :json => {:error => "No user loggedin" }, :status => 400
	  end

	    Rails.logger.info("[HOME] [COMMON] current user id #{current_user.id}")
	    Rails.logger.info("[HOME] [COMMON] current user data #{current_user}")

	    response_json = {}

	    info = User.where(:srv_uid => current_user.srv_uid).first

	    response_json[:name] = info["name"]
	    response_json[:uid] = current_user.srv_uid 
	    response_json[:sex] = info["sex"]
	    response_json[:pic] = info["pic"]
	    response_json[:vote_count] = info["vote_count"]
	    response_json[:auth_token] = current_user.access_token #session[:token]
	    response_json[:post_count] = info.posts.length

	    Rails.logger.info("[HOME] [get_current_user_details] auth #{response_json}")

	    if request.xhr?
	        expires_in 10.minutes
	        render :json => response_json
	        return
	    end 
	end

	

end