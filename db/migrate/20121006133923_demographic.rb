class Demographic < ActiveRecord::Migration
  def change
    create_table(:demographics) do |t|
      t.string :uid
      t.string :access_token
      t.string :name
      t.string :gender
      t.string :email
      t.string :home_location
      t.string :location
      t.string :birthday

      t.timestamps
    end

  end
end
