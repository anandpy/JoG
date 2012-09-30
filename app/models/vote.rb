class Vote < ActiveRecord::Base
  belongs_to :user, :counter_cache => true
  belongs_to :post, :counter_cache => true

  validates_uniqueness_of :user_id, :scope => :post_id, :unless => Proc.new { |obj| !obj.user_id.nil? }
end
