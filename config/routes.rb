JoG::Application.routes.draw do

# devise_for :users
devise_for :users, :controllers => {
                                    :sessions => "users/sessions",
                                    :registrations => "users/registrations",
                                    :omniauth_callbacks => "users/omniauth_callbacks" 
                                   }

devise_scope :user do
  get 'logout' => 'devise/sessions#destroy'
end


# devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
# devise_for :users do
#   get 'logout' => 'devise/sessions#destroy'
# end


  match '/get_daily_leaderboard_post' => "post#get_daily_leaderboard_post"
  match '/generate_daily_leaderboard' => "post#generate_daily_leaderboard"
  match '/update_call_back' => "home#update_call_back"
  match '/delete_post' => "post#delete_post"
  match '/fetch_single_post' => "post#get_post_detail"
  match '/post_metric' => "post#get_jog_post_metric"
  match '/leaderboard' => "home#show"
  match '/fetch_all_user' => "home#get_all_users"
  match '/leaderboard_posts' => "post#get_leaderboard_posts"
  match '/fetch_all_posts' => "post#all_post"
  match '/all_posts' => 'home#show'
  match '/fetch_post' => "post#get_posts"
  match '/current_user_details' => "home#get_current_user_details"
  match '/update_vote' => 'post#update_vote'
  match '/create_post' => "post#create_post"
  match '/user' => 'home#show'
  match '/show/:id' => 'home#show'
  match '/post/:id' => 'home#show'
  match '/loggedin_user' => "home#get_loggedin_user_details"




  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
   root :to => 'home#index'



  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  #match ':controller(/:action(/:id))(.:format)' ,:using_default_route => true
  match '*path' => "home#index"
end
