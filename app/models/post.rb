class Post < ActiveRecord::Base
	belongs_to :user

	def self.create_post(params)
		Rails.logger.info("[MODEL] [POST] [CREATE_POST] Entering #{params.inspect}")

		h = {
	      :user_id => params[:user_id],
	      :text => params[:text],
	      :pic => params[:pic],
	      :vote_count => 0,
	     }

		p = Post.create!(h)

		Rails.logger.info("[MODEL] [POST] [CREATE_POST] Leaving")

	return p

  	rescue => e
		Rails.logger.error("[MODEL] [POST] [CREATE_POST] ****RESCUE**** #{e.message}")
		return nil
	end
end
