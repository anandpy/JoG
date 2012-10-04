class Users::SessionsController < Devise::SessionsController
   
  def new
    redirect_to '/'
    return
  end   

  def create
=begin
  	Rails.logger.info("[CNTRL] [USERS] [Sessions] [CREATE] Entering")
    h = {:srv => params[:provider], :srv_uid => params[:srv_uid], :access_token => params[:access_token]}

    user = User.update_client_loggedin_user(h)
    if user.nil?
      redirect_to '/'

      return
    else
      Rails.logger.info("[CNTRL] [USERS] [Sessions] [CREATE] Logging In")
      aw_sign_in(user)      
    end	
=end
	redirect_to '/'
	return    
  end

end
