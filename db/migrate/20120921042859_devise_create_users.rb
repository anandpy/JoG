class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      t.string :srv
      t.string :srv_uid
      t.string :access_token
      t.string :username
      t.string :name
      t.string :pic
      t.string :sex
      t.string :vote_count
      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, :default => 0
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      ## Token authenticatable
      t.string :authentication_token


      t.timestamps
    end

    add_index :users, [:srv_uid, :srv], :unique => true
    add_index :users, :srv
    add_index :users, :vote_count

    add_index :users, :authentication_token, :unique => true
    
  end
end
