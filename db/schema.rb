# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121003055145) do

  create_table "leaderboard_posts", :force => true do |t|
    t.integer  "post_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "leaderboard_posts", ["post_id"], :name => "index_leaderboard_posts_on_post_id"

  create_table "posts", :force => true do |t|
    t.integer  "user_id"
    t.string   "pic"
    t.text     "title"
    t.text     "text"
    t.integer  "votes_count", :default => 0
    t.string   "user_uid"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.string   "category"
  end

  add_index "posts", ["user_id"], :name => "index_posts_on_user_id"
  add_index "posts", ["user_uid"], :name => "index_posts_on_user_uid"
  add_index "posts", ["votes_count"], :name => "index_posts_on_votes_count"

  create_table "users", :force => true do |t|
    t.string   "srv"
    t.string   "srv_uid"
    t.string   "access_token"
    t.string   "username"
    t.string   "name"
    t.string   "pic"
    t.string   "sex"
    t.integer  "votes_count",          :default => 0
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",        :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "authentication_token"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

  add_index "users", ["authentication_token"], :name => "index_users_on_authentication_token", :unique => true
  add_index "users", ["srv"], :name => "index_users_on_srv"
  add_index "users", ["srv_uid", "srv"], :name => "index_users_on_srv_uid_and_srv", :unique => true
  add_index "users", ["votes_count"], :name => "index_users_on_votes_count"

  create_table "votes", :force => true do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "votes", ["post_id"], :name => "index_votes_on_post_id"
  add_index "votes", ["user_id", "post_id"], :name => "index_votes_on_user_id_and_post_id", :unique => true

end
