class Email < ActiveRecord::Base

	belongs_to :user

	validates_presence_of :user_id
	validates_uniqueness_of :user_id
    
	def self.create_email(params)
		Rails.logger.info("[MODEL] [POST] [Email] Entering #{params.inspect}")

		h = {
	      :user_id => params[:user_id],
	      :email => params[:email],
	     }

		p = Email.create!(h)

		Rails.logger.info("[MODEL] [POST] [Email] Leaving")

		return p

  	rescue => e
		Rails.logger.error("[MODEL] [POST] [Email] ****RESCUE**** #{e.message}")
		return nil
	end
end
