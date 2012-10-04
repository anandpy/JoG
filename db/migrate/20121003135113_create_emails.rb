class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :email
      t.integer :user_id

      t.timestamps
    end
    add_index :emails, :user_id, :unique => true
  end
end