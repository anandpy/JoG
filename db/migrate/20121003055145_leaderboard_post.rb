class LeaderboardPost < ActiveRecord::Migration
  def change
    create_table :leaderboard_posts do |t|
      t.integer :post_id
      t.integer :votes_count
      
      t.timestamps
    end
    add_index :leaderboard_posts, :post_id
  end
end
