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
        Rails.logger.info("[HOME] [COMMON] current user uid #{current_user.srv_uid}")

        h = {:user_id => current_user.id,
            :user_uid => current_user.srv_uid,
            :text => params["text"],
            :title => params["title"],
            :pic => params["imgSrc"],
            :category => params["cat"],
        }
        
        p = Post.create_post(h)

        if !p.blank?
            render :json => p ,:status => 200
        else
            render :json => {:error => "Create post failed"}, :status => 400
        end    
    end


     ################################################################################################
     # INPUT => MANDATORY ONES 
     # 
     ################################################################################################# 
     def delete_post

        Rails.logger.info("[CNTRL] [POST] [delete_post] post delete requested") 

        if !user_signed_in? 
          Rails.logger.error("[CNTRL] [POST] [delete_post] ****USER NOT LOGGED IN****")
          render :json => {:error => "No user loggedin" }, :status => 400
        end
        Rails.logger.info("[CNTRL] [POST] [delete_post] current user id #{current_user.id}")
        Rails.logger.info("[CNTRL] [POST] [delete_post] params #{params.inspect}") 
        Rails.logger.info("[CNTRL] [POST] [delete_post] current user uid #{current_user.srv_uid}")
        

        if params[:type] == "admin"
            raise "admin authentication wrong" if params[:user_id] != current_user.id.to_s or params[:key].blank? or params[:key] != AppConstants.mmt_key
        elsif params[:type] == "user"
            raise "user authentication wrong" if p.user_id.to_s == params[:user_id] 
        else 
            raise "wrong authentication type"
        end
  
        p = Post.where(:id => params["post_id"].to_i).first

        if p 
            p.destroy
        else
            Rails.logger.info("[CNTRL] [POST] [delete_post] params #{p.inspect}") 
            raise "wrong user id, no authentication"
        end

        #p = Post.delete(params[:post_id])
        
        if !p.blank? 
            render :json => p ,:status => 200
        else
            render :json => {:error => "destroy post failed"}, :status => 400
        end 
    rescue => e
      Rails.logger.error("[POST] [delete_post] **** ERROR **** #{e.message} ")
      render :json => {:error => e.message }, :status => 400    
    end


    ################################################################################################
    # Update vote
    # INPUT => {:post_id => 123, :user_id => 234}
    ################################################################################################# 

    def update_vote
        Rails.logger.info("[POST][CNTL][update_vote] Entering #{params.inspect}")
        
        raise "wrong number of parameters" if params[:user_id].blank? or params[:post_id].blank?

        post = Post.where(:id => params["post_id"].to_i).first
        Rails.logger.info("[POST] [update_vote] update #{post.inspect}")
        
        if !post.blank?
            Vote.create!(:user_id => params["user_id"].to_i, :post_id => params["post_id"].to_i)
            
            Rails.logger.info("[POST] [update_vote] update #{post.inspect}")

            p = Post.where(:id => params["post_id"].to_i).first
            #post.reload!
            render :json => p, :status => 200
        else
            render :json => {:error => "No post found" }, :status => 400
        end 
    rescue => e
      Rails.logger.error("[POST] [update_vote] **** ERROR **** #{e.message} #{post.inspect}")
      render :json => {:error => e.message }, :status => 400
    end 


    ################################################################################################
    #
    # Get single post details for individual page
    #
    #################################################################################################     
    def get_post_detail
        Rails.logger.info("[CNTRL] [POST] [get_post_detail] enter #{params}");

        post = Post.where(:id => params[:post_id])


        if !post
            redirect redirect_to '/'
        else
            response_json = {}
            p = post[0]
            user = p.user
            response_json[:user_name] = user[:name]
            response_json[:user_pic]  = user[:pic]
            response_json[:user_uid] = user[:srv_uid]
            response_json[:post_title] = p[:title]
            response_json[:post_text] = p[:text]
            response_json[:post_pic]  = p[:pic]
            response_json[:time_stamp] = p[:created_at]
            response_json[:votes_count] = p[:votes_count]
            response_json[:post_id] = p[:id]
            if request.xhr?
                Rails.logger.debug("[CNTRL] [POST] [get_post_detail] detail:#{response_json.inspect}")
                expires_in 10.minutes
                render :json => response_json
                return
            end
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
            @user_uid = User.find_by_srv_uid(params[:user_id])[:srv_uid]
        else 
            if !user_signed_in? 
                Rails.logger.error("[CNTRL] [HOME] [get_current_user_details] ****USER NOT LOGGED IN****")
                render :json => {:error => "No user loggedin" }, :status => 400
            end
            @user_uid = current_user.srv_uid
        end

        #if !user_signed_in? 
        #  Rails.logger.error("[CNTRL] [POST] [get_posts] ****USER NOT LOGGED IN****")
        #  render :json => {:error => "No user loggedin" }, :status => 400
        #end

        #Rails.logger.info("[HOME] [COMMON] current user id #{session[:current_user_id]}")
        #Rails.logger.info("[POST] [COMMON] current user id #{current_user.id}")

        response_json = Post.where(:user_uid => @user_uid).order('id DESC') 

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

        response_json = Post.where(:user_id => current_user.id).order('votes_count DESC') 

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
    # FIXME:TAG-REMOVE-REPEAT
    def all_post
        Rails.logger.info("[CNTRL] [POST] [all_post] enter #{params}");
        
        response_json = []

        #posts = Post.find(:all, :order => "id desc", :limit => 40).reverse
        posts = Post.order('id DESC').limit(30)

        posts.each do |p|
            h = {}
            user = p.user
            h[:user_name] = user[:name]
            h[:user_pic]  = user[:pic]
            h[:user_uid] = user[:srv_uid]
            h[:post_title] = p[:title]
            h[:post_text] = p[:text]
            h[:post_pic]  = p[:pic]
            h[:post_id] = p[:id]
            h[:time_stamp] = p[:created_at]
            h[:votes_count] = p[:votes_count]
            response_json << h
        end

        if request.xhr?
            #Rails.logger.debug("[CNTRL] [HOME] [get_locations] Return:#{response_json.inspect}")
            expires_in 10.minutes
            render :json => response_json
            return
        end

        Rails.logger.info("[CNTRL] [POST] [all_post] leave");

    end

    ################################################################################################
    #
    #
    #
    ################################################################################################# 
    # FIXME:TAG-REMOVE-REPEAT
    def get_leaderboard_posts
        Rails.logger.info("[CNTRL] [POST] [get_leaderboard_posts] enter #{params}");
        
        response_json = []

        posts = Post.order('votes_count DESC').limit(10)

        posts.each do |p|
            h = {}
            user = p.user
            h[:user_name] = user[:name]
            h[:user_pic]  = user[:pic]
            h[:user_uid] = user[:srv_uid]
            h[:post_title] = p[:title]
            h[:post_text] = p[:text]
            h[:post_pic]  = p[:pic]
            h[:post_id] = p[:id]
            h[:time_stamp] = p[:created_at]
            h[:votes_count] = p[:votes_count]
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

    ################################################################################################
    #
    #
    #
    ################################################################################################# 
    def get_jog_post_metric

        Rails.logger.info("[CNTRL] [POST] [get_jog_post_metric] enter #{params}");

        post_count = Post.count

        votes_count = Post.sum("votes_count")

        response_json = { :post_count => post_count , :votes_count => votes_count}

        Rails.logger.info("[CNTRL] [POST] [get_jog_post_metric] result #{response_json}");

        if request.xhr?
            #Rails.logger.debug("[CNTRL] [HOME] [get_locations] Return:#{response_json.inspect}")
            expires_in 10.minutes
            render :json => response_json
            return
        end
    end

    ################################################################################################
    #
    #
    #
    ################################################################################################# 
    def generate_daily_leaderboard
        Rails.logger.info("[CNTRL] [POST] [generate_daily_leaderboard] enter" );
        Rails.logger.info("[CNTRL] [POST] [generate_daily_leaderboard] params #{params.inspect}");

        raise "not authorized to generate leaderboard" if params[:key].blank? or params[:key] != AppConstants.mmt_key

        LeaderboardPost.delete_all

        posts = Post.order('votes_count DESC').limit(5)

        posts.each do |p|
            h = {}
            h[:post_id] = p[:id]
            LeaderboardPost.create_post(h)
        end 

        response_json = {:key => "success"}

        render :json => response_json
    rescue => e
      Rails.logger.error("[POST] [generate_daily_leaderboard] **** ERROR **** #{e.message}")
      render :json => {:error => e.message }, :status => 400
    end


    ################################################################################################
    #
    #
    #
    ################################################################################################# 
    # FIXME:TAG-REMOVE-REPEAT
    def get_daily_leaderboard_post
        Rails.logger.info("[CNTRL] [POST] [get_leaderboard_posts] enter #{params}");
        
        response_json = []

        posts = LeaderboardPost.all

        posts.each do |lp|
            h = {}
            p = lp.post
            user = p.user
            h[:user_name] = user[:name]
            h[:user_pic]  = user[:pic]
            h[:user_uid] = user[:srv_uid]
            h[:post_title] = p[:title]
            h[:post_text] = p[:text]
            h[:post_pic]  = p[:pic]
            h[:post_id] = p[:id]
            h[:time_stamp] = p[:created_at]
            h[:votes_count] = p[:votes_count]
            response_json << h
        end
       
        render :json => response_json
        
        Rails.logger.info("[CNTRL] [POST] [get_leaderboard_posts] leave");
    end
end
