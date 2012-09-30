class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.string  :pic
      t.text    :title
      t.text    :text

      t.integer :votes_count, :default => 0

      t.string :user_uid
      t.timestamps
    end
    add_index :posts, :user_id
    add_index :posts, :votes_count
    add_index :posts, :user_uid
  end

end
