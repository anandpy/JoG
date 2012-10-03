class LeaderboardPost < ActiveRecord::Base
	belongs_to :post
    
	def self.create_post(params)
		Rails.logger.info("[MODEL] [POST] [LeaderboardPost] Entering #{params.inspect}")

		h = {
	      :post_id => params[:post_id],
	     }

		p = LeaderboardPost.create!(h)

		Rails.logger.info("[MODEL] [POST] [LeaderboardPost] Leaving")

		return p

  	rescue => e
		Rails.logger.error("[MODEL] [POST] [LeaderboardPost] ****RESCUE**** #{e.message}")
		return nil
	end
end