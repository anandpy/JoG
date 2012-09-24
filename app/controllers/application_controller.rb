class ApplicationController < ActionController::Base
  protect_from_forgery

  #existing but not signed in user
  def aw_sign_in_existing_user(params)

    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_in_existing_user] Entering")

    u = User.check_user(params)
    if !u.blank?
      Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_in_existing_user] User Exist")

      session[:srv_uid] = u.srv_uid
      session[:srv] = u.srv

      #update access token coming from params to get latest token & sign in him directly
      u.update_attribute(:access_token, params[:access_token])

      aw_sign_in(u)

      return u
    end
    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_in_existing_user] Leaving")

    return nil

  rescue => e
    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_in_existing_user] ****RESCUE**** #{e.message}")
    return nil
  end

  #existing but not signed in user
  def aw_sign_in(user)
    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_in] Entering")

    session[:srv_uid] = user.srv_uid
    session[:srv] = user.srv
    sign_in(user, :event => :authentication)

    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_in] Entering")

    return true
  rescue => e
    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_in] ****RESCUE**** #{e.message}")
    return false
  end

  #existing but not signed in user
  def aw_sign_out(user)
    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_out] Entering")

    session[:srv_uid] = nil
    session[:srv] = nil

    sign_out(user)

    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_out] Leaving")

    return true
  rescue => e
    Rails.logger.info("[CNTRL] [APPLICATION] [aw_sign_out] ****RESCUE**** #{e.message}")
    return false
  end
  
end
