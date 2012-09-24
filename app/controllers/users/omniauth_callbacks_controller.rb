class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    Rails.logger.info("[CNTRL] [USERS] [OmniauthCallbacks] [FACEBOOK] Entering")

    auth = request.env["omniauth.auth"]

    h = {:srv => auth.provider, :srv_uid => auth.uid, :access_token => auth.credentials.token}

    h[:name] = auth.info.name
    h[:pic] = auth.info.image
    h[:location] = auth.info.location

    if !auth.extra.blank? and !auth.extra.raw_info.blank?
      h[:username] = auth.extra.raw_info[:username],
      h[:sex] = auth.extra.raw_info.gender
    end

    user = User.create_user(h)

    Rails.logger.info("[CNTRL] [USERS] [OmniauthCallbacks] [FACEBOOK] Leaving #{user.inspect}")

    aw_sign_in(user)

    redirect_to user
  rescue => e
    Rails.logger.info("[CNTRL] [USERS] [OmniauthCallbacks] [FACEBOOK] ****RESCUE**** #{e.message}")
  end

end
