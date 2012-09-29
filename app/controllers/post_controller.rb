class PostController < ApplicationController

	################################################################################################
	# INPUT => MANDATORY ONES
	# 
	################################################################################################# 
	def create_post
		Rails.logger.info("[CNTRL] [POST] [CREATE] New post create requested") 
        if !user_signed_in? 
          Rails.logger.error("[CNTRL] [HOME] [get_posts] ****USER NOT LOGGED IN****")
          render :json => {:error => "No user loggedin" }, :status => 400
        end
        Rails.logger.info("[HOME] [COMMON] current user id #{current_user.id}")
		Rails.logger.info("[CNTRL] [POST] [CREATE] params #{params.inspect}") 

        h = {:user_id => current_user.srv_uid,
            :text => params["text"],
            :title => params["title"],
            :pic => params["imgSrc"]
        }
        
        p = Post.create_post(h)

        if !p.blank?
            render :json => p ,:status => 200
        else
            render :json => {:error => "Create post failed"}, :status => 400
        end    
    end

    ################################################################################################
    # Update vote
    # 
    ################################################################################################# 

    def update_vote
        Rails.logger.info("[POST][CNTL][update_vote] Entering #{params.inspect}")

        post = Post.where(:id => params["postID"].to_i).first
        Rails.logger.info("[POST] [update_vote] update #{post.inspect}")
        if !post.blank?
            user = post.user
            
            post_vote = post[:vote_count]
            user_vote = user[:vote_count]
            post.update_attribute(:vote_count,post_vote+1)
            user.update_attribute(:vote_count,user_vote+1)
            
            Rails.logger.info("[POST] [update_vote] update #{post.inspect}")
            render :json => post, :status => 200
        else
            render :json => {:error => "No post found" }, :status => 400
        end 
    end 


	################################################################################################
    #
    #
    #
    ################################################################################################# 
    def get_posts
        Rails.logger.info("[CNTRL] [POST] [get_posts] enter #{params}");

        if params[:user_id] != "nil"
            @user_uid = User.find_by_srv_uid(params[:user_id])[:id]
        else 
            if !user_signed_in? 
                Rails.logger.error("[CNTRL] [HOME] [get_current_user_details] ****USER NOT LOGGED IN****")
                render :json => {:error => "No user loggedin" }, :status => 400
            end
            @user_uid = current_user.id
        end

        #if !user_signed_in? 
        #  Rails.logger.error("[CNTRL] [POST] [get_posts] ****USER NOT LOGGED IN****")
        #  render :json => {:error => "No user loggedin" }, :status => 400
        #end

        #Rails.logger.info("[HOME] [COMMON] current user id #{session[:current_user_id]}")
        #Rails.logger.info("[POST] [COMMON] current user id #{current_user.id}")

        response_json = Post.where(:user_id => @user_uid).order('id DESC') 

        if request.xhr?
            #Rails.logger.debug("[CNTRL] [HOME] [get_locations] Return:#{response_json.inspect}")
            expires_in 10.minutes
            render :json => response_json
            return
        end

        Rails.logger.info("[CNTRL] [POST] [get_posts] leave");
    end

    ################################################################################################
    #
    #
    #
    ################################################################################################# 
    def get_popular_posts
        Rails.logger.info("[CNTRL] [POST] [get_popular_posts] enter #{params}");
        if !user_signed_in? 
          Rails.logger.error("[CNTRL] [POST] [get_popular_posts] ****USER NOT LOGGED IN****")
          render :json => {:error => "No user loggedin" }, :status => 400
        end

        #Rails.logger.info("[HOME] [COMMON] current user id #{session[:current_user_id]}")
        Rails.logger.info("[POST] [COMMON] current user id #{current_user.id}")

        response_json = Post.where(:user_id => current_user.id).order('vote_count DESC') 

        if request.xhr?
            #Rails.logger.debug("[CNTRL] [HOME] [get_locations] Return:#{response_json.inspect}")
            expires_in 10.minutes
            render :json => response_json
            return
        end

        Rails.logger.info("[CNTRL] [POST] [get_popular_posts] leave");
    end

    ################################################################################################
    #
    #
    #
    ################################################################################################# 
    def get_leaderboard_posts
        Rails.logger.info("[CNTRL] [POST] [get_leaderboard_posts] enter #{params}");
        
        response_json = []

        posts = Post.order('vote_count DESC').limit(10)

        posts.each do |p|
            h = {}
            user = p.user
            h[:user_name] = user[:name]
            h[:user_pic]  = user[:pic]
            h[:user_uid] = user[:srv_uid]
            h[:post_title] = p[:title]
            h[:post_text] = p[:text]
            h[:post_pic]  = p[:pic]
            h[:vote_count] = p[:vote_count]
            response_json << h
        end

        if request.xhr?
            #Rails.logger.debug("[CNTRL] [HOME] [get_locations] Return:#{response_json.inspect}")
            expires_in 10.minutes
            render :json => response_json
            return
        end

        Rails.logger.info("[CNTRL] [POST] [get_leaderboard_posts] leave");
    end


end