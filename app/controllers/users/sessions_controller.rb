class Users::SessionsController < Devise::SessionsController
   
  def new
    redirect_to '/'
    return
  end   

  def create

    if request.xhr?
        Rails.logger.info("[CNTRL] [USERS] [Sessions] [CREATE] Entering  #{params.inspect}")
        h = {:srv_uid => params[:srv_uid], :access_token => params[:access_token]}

        user = User.update_client_loggedin_user(h)
        if user.nil?
          raise "user is not logged in"
          return
        else
          Rails.logger.info("[CNTRL] [USERS] [Sessions] [CREATE] Logging In")
          user_id = user.id
          Rails.logger.info("[CNTRL] [USERS] [Sessions] [CREATE] Logging In=========== #{user_id}")
          aw_sign_in(user)
          Rails.logger.info("[CNTRL] [USERS] [Sessions] [CREATE] current user data #{current_user.inspect}")
          #redirect_to '/'
          response_json = {:id => current_user.id}
          render :json => response_json
          return
        end 
    else
    	redirect_to '/'
  	  return 
    end   
  rescue => e
    Rails.logger.error("[CNTRL] [HOME] [create] ****RESCUE**** #{e.message}")
    render :json => {:error => e.message }, :status => 400
  end


  # def destroy
  #   Rails.logger.info("[CNTRL] [USERS] [Sessions] [destroy] Entering  #{params.inspect}")
  #   super
  # end

  def sign_in_user
    
  end

end
