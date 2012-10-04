class HomeController < ApplicationController

	################################################################################################
	# INPUT => MANDATORY ONES
	#  { :srv => "facebook" , :srv_uid => "1234444", :access_token => "ADFFSFFjhjjhjjhjhj.."
	################################################################################################# 
	def index
		Rails.logger.info("[CNTRL] [HOME] [INDEX] New App Main Page requested")
		session["user_return_to_for_vote"] = ""	
		@page_mode = "landing_page"
		@page_id = "all" 
		if user_signed_in?
		  Rails.logger.error("[CNTRL] [HOME] [INDEX] *****DETECTED USER***** #{current_user.inspect}")
		  redirect_to current_user
		  return
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

		Rails.logger.info("[CNTRL] [HOME] [SHOW] #{request.env['PATH_INFO']}")

 		session["user_return_to_for_vote"] = ""	

		if request.env['PATH_INFO'].split("/")[1] == "leaderboard"
			@page_mode = "leaderboard"
			if user_signed_in?
				@page_id = 	current_user.srv_uid
			end	
		elsif request.env['PATH_INFO'].split("/")[1] == "all_posts"
			@page_mode = "all_posts"
			session["user_return_to_for_vote"] = "hello sir how are you"
			if user_signed_in?
				@page_id = 	current_user.srv_uid
			end	
		elsif request.env['PATH_INFO'].split("/")[1] == "show"
			if user_signed_in? && current_user.srv_uid == params[:id]
				@page_mode = "loggedin_user"
				@page_id = "nil"
			else
				@page_id = params[:id]
				@page_mode = "user_show_page"
			end
		elsif request.env['PATH_INFO'].split("/")[1] == "post"
			@page_mode = "post_show_page"
			@page_id = params[:id]
		else
			if !user_signed_in? 
			  redirect_to '/'
			end
			@page_mode = "loggedin_user"
			@page_id = "nil"
		end


		
		#if !user_signed_in? 
		#  redirect_to '/'
		#end



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

	    if params[:user_id] != "nil"
	    	@user_uid = params[:user_id]
	    else 
	    	if !user_signed_in? 
	      		Rails.logger.error("[CNTRL] [HOME] [get_current_user_details] ****USER NOT LOGGED IN****")
	      		render :json => {:error => "No user loggedin" }, :status => 400
	      		return
	      	else
	    		@user_uid = current_user.srv_uid
	    	end
	    end

	    #Rails.logger.info("[HOME] [COMMON] current user id #{current_user.id}")
	    #Rails.logger.info("[HOME] [COMMON] current user data #{current_user}")

	    response_json = {}

	    #info = User.where(:srv_uid => current_user.srv_uid).first
	    info = User.where(:srv_uid => @user_uid).first	

        if !info
        	Rails.logger.info("[HOME] [get_current_user_details] not legal uid, redirect to home")
        	redirect_to '/'
        	return
        end

        p = Post.where(:user_id => info.id).group(:votes_count).sum(:votes_count)
        puts "==================== #{p.inspect}======================"

        if p.blank?
        	votes_count = 0
        else 
        	votes_count = p.keys[0]
        end

	    response_json[:name] = info["name"]
	    response_json[:uid] = @user_uid
	    response_json[:id] = info["id"] 
	    response_json[:sex] = info["sex"]
	    response_json[:pic] = info["pic"]
	    response_json[:votes_count] = votes_count
	    #response_json[:auth_token] = current_user.access_token #session[:token]
	    response_json[:auth_token] = info["access_token"] #session[:token]
	    response_json[:post_count] = info.posts.length

	    Rails.logger.info("[HOME] [get_current_user_details] auth #{response_json}")

	    if request.xhr?
	        #expires_in 10.minutes
	        render :json => response_json
	        return
	    end 
	end

	################################################################################################
	#
	#
	#
	#################################################################################################
	def get_loggedin_user_details
		Rails.logger.info("[HOME] [get_current_user_details] Entering #{params}")

	    if !user_signed_in? 
	    	Rails.logger.error("[CNTRL] [HOME] [get_current_user_details] ****USER NOT LOGGED IN****")
	        render :json => {:error => "No user loggedin" }, :status => 400
	        return
	    	
	    end

	    Rails.logger.info("[HOME] [COMMON] current user id #{current_user.id}")
	    Rails.logger.info("[HOME] [COMMON] current user data #{current_user}")

	    response_json = {}

	    info = User.where(:srv_uid => current_user.srv_uid).first
	    #info = User.where(:srv_uid => @user_uid).first	

        if !info
        	Rails.logger.info("[HOME] [get_current_user_details] not legal uid, redirect to home")
        	redirect_to '/'
        end

	    response_json[:name] = info["name"]
	    response_json[:uid] = current_user.srv_uid
	    response_json[:id] = info["id"]  
	    response_json[:sex] = info["sex"]
	    response_json[:pic] = info["pic"]
	    response_json[:votes_count] = info["votes_count"]
	    response_json[:auth_token] = current_user.access_token #session[:token]
	    #response_json[:auth_token] = info["access_token"] #session[:token]
	    response_json[:post_count] = info.posts.length

	    Rails.logger.info("[HOME] [get_current_user_details] auth #{response_json}")

	    if request.xhr?
	        render :json => response_json
	        return
	    end 
	end

	################################################################################################
	#
	#
	#
	################################################################################################# 
	def update_call_back
		Rails.logger.info("[HOME] [update_call_back] enter")
		Rails.logger.info("[HOME] [update_call_back] params #{params.inspect}")

		session[:user_return_to_for_vote] = "/post/" + params[:id].to_s

		response_json = {:link => session[:user_return_to_for_vote] }
		if request.xhr?
	        render :json => response_json
	        return
	    end 
		Rails.logger.info("[HOME] [update_call_back] leave")
	end
	


	################################################################################################
	#
	#
	#
	################################################################################################# 
	def get_all_users

		response_json = User.all

		if request.xhr?
	        expires_in 5.minutes
	        render :json => response_json
	        return
	    end 
	end

end
