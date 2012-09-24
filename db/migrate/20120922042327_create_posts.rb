class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.string  :vote_count
      t.string  :pic
      t.text    :title
      t.text    :text

      t.timestamps
    end
    add_index :posts, :user_id
    add_index :posts, :vote_count
  end

end
