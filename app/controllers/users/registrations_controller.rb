class Users::RegistrationsController < Devise::SessionsController
   
  def new
    redirect_to '/'
  end   

  def create
    redirect_to '/'
  end

end
