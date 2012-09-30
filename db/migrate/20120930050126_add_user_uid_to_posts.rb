class AddUserUidToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :user_uid, :string

  end
end
