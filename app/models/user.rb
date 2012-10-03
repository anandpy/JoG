class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise  :rememberable, :trackable, :token_authenticatable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :remember_me

  validates_uniqueness_of :srv_uid, :scope => :srv

  validates_presence_of :srv_uid, :srv

  attr_accessible :srv_uid, :access_token, :srv, :username, :name, :pic, :sex, :votes_count
  has_many :posts,:dependent => :destroy

  has_many :votes


  def self.create_user(params)
	Rails.logger.info("[MODEL] [USER] [CREATE_USER] Entering #{params.inspect}")

	u = User.where(:srv_uid => params[:srv_uid].to_s(), :srv => params[:srv]).first

	#create common hash which can be updated ate every sign in
	h = {
	      :username => params[:username],
	      :name => params[:name],
	      :pic => "http://graph.facebook.com/#{params[:srv_uid]}/picture?type=large",
	      :sex => params[:sex],
	      #:email => params[:email]
	     }

	h[:access_token] = params[:access_token] if !params[:access_token].blank?


	if u.blank?

	  h[:srv_uid] = params[:srv_uid]
	  h[:srv] = params[:srv]
	  h[:votes_count] = 0

	  u = User.create!(h)

	else
	  #update the access token and other fields
	  Rails.logger.info("[MODEL] [USER] [CREATE_USER] signed_in")

	  u.update_attributes(h)
	  u.reload
	end

	Rails.logger.info("[MODEL] [USER] [CREATE_USER] Leaving")

	return u

  rescue => e
	Rails.logger.error("[MODEL] [USER] [CREATE_USER] ****RESCUE**** #{e.message}")
	return nil
  end

	#helper function
  def self.check_user(params)
	u = User.where(:srv_uid => params[:srv_uid], :srv => params[:srv]).first
	u
  end

end

