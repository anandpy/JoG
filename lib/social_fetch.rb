require "net/http"
require "uri"
require "cgi"
require "json"

module SocialFetch


      def self.http_get(url)
        uri = URI.parse(url)
      
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        request = Net::HTTP::Get.new(uri.request_uri)

        response = http.request(request)
        response.body
      end

      def self.get_fb_email(url)
        #feed = "https://graph.facebook.com/1452186072?fields=email&access_token=AAADeYrgHl2sBAP3STw5pXD7O2PFn7ldgIZBpTuJF2RyZCJEx0ZBkTrffPPGOyBUTQa3gl1OWhFrH57EHVWQZAZA4syllHqyomKRdynKcHCQZDZD"
        success_count = 0
        failed_count = 0
        response = http_get(url)

        json = JSON.parse(response)

        return {} if json.blank? or json.blank?
        json

      end

      def self.get_fb_data(url)
        #puts "[CHECK FB URL ]"
        response = http_get(url)

        json_data = JSON.parse(response)

        #Rails.logger.info("[RESPONSE #{json_data.inspect}]")
        return {} if json_data.blank? 
        json_data

      end

      def self.populate_email_ids
        feed = "https://graph.facebook.com/"
        users = User.all
        success_count = 0
        failed_count = 0
        users.each do |u|
          if !u.access_token.nil? and !u.srv_uid.nil?

            url = "#{feed}#{u.srv_uid}?fields=email&access_token=#{u.access_token}"            
            email = get_fb_email(url)
            puts u.inspect
            if !email.blank? 

              email_conf = {}
              email_conf[:user_id] = u.id
              email_conf[:email] = email

              ret_email = Email.create_email(email_conf)

              unless ret_email.nil?
                Rails.logger.info("[SUCCESS] for #{email} ")
                success_count = success_count + 1
                puts success_count
              else
                Rails.logger.info("[FAILED] for #{email} ")
                failed_count = failed_count + 1
                puts failed_count
              end
            end            
          
          end  #email nil end

        end #Do end

        Rails.logger.info("[TOTAL SUCCESS] : #{success_count} [FAILED] :#{failed_count} ")
      end

      ##############################################################################
      #
      #
      #
      #
      def self.populate_posts
  
        old_logger = ActiveRecord::Base.logger
        ActiveRecord::Base.logger = nil


        posts = Post.order('votes_count DESC')
        success_count = 0
        failed_count = 0
   
        jFile = File.new("demo_post.json","w")
        

        posts.each do |p|
          if !p.id.nil?

            h = {}
            user = p.user
            h[:post_id] = p[:id]
            h[:user_name] = user[:name]
            h[:user_pic]  = user[:pic]
            h[:user_uid] = user[:srv_uid]
            h[:post_title] = p[:title]
            h[:post_text] = p[:text]
            h[:post_pic]  = p[:pic]
            h[:votes_count] = p[:votes_count]
            h[:time_stamp] = p[:created_at]
            if !h.blank? 
              
              jsonData = h

              jFile.write(JSON.pretty_generate(jsonData) + ",\n")
              
              puts "[SUCCESS #{success_count}]"

              success_count = success_count + 1
            else
              failed_count = failed_count + 1
            end            
          
          end  #email nil end

        end #Do end
        jFile.close
        Rails.logger.info("[TOTAL SUCCESS] : #{success_count} [FAILED] :#{failed_count} ")
      end  

      ##############################################################################
      #
      #
      #
      #
      def self.populate_demographics
        old_logger = ActiveRecord::Base.logger
        ActiveRecord::Base.logger = nil


        feed = "https://graph.facebook.com/"
        users = User.all
        success_count = 0
        failed_count = 0
   
        jFile = File.new("demo.json","w")
        

        users.each do |u|
          if !u.access_token.nil? and !u.srv_uid.nil?
           


            p = Post.where(:user_id => u.id).group(:votes_count).sum(:votes_count)
            if p.blank?
              votes_count = 0
            else 
              votes_count = p.keys[0]
            end

            vote_casted = Vote.where(:user_id => u.id).count  

            url = "#{feed}#{u.srv_uid}?access_token=#{u.access_token}"      

            jData = get_fb_data(url)

            puts u.inspect
            if !jData.blank? 
              
              jsonData = jData

              #puts "[JSON #{jsonData.inspect}]"

              json_conf = {}
              json_conf[:name] = jsonData["name"] || ""
              json_conf[:uid] = u.srv_uid || ""
              json_conf[:access_token] = u.access_token || ""
              json_conf[:email] = jsonData["email"] || ""
              json_conf[:location] = jsonData["location"] || ""
              json_conf[:birthday] = jsonData["birthday"] || ""
              json_conf[:gender] = jsonData["gender"] || ""
              json_conf[:total_votes_received] = votes_count
              json_conf[:total_posts] = u.posts.length
              json_conf[:total_votes_casted] = vote_casted

              #ret_email = Email.create_email(email_conf)
              
              jFile.write(JSON.pretty_generate(json_conf) + ",\n")
              
              puts "[SUCCESS #{success_count}]"

              success_count = success_count + 1
            else
              failed_count = failed_count + 1
            end            
          
          end  #email nil end

        end #Do end
        jFile.close
        Rails.logger.info("[TOTAL SUCCESS] : #{success_count} [FAILED] :#{failed_count} ")  
      end

      ##############################################################################
      #
      #
      #
      #
      def self.populate_posts_analytics
        old_logger = ActiveRecord::Base.logger
        ActiveRecord::Base.logger = nil

        success_count = 0
        failed_count = 0

        posts = Post.order('votes_count DESC').limit(3)
   
        jFile = File.new("votes_for_posts.json","w")
        
        success_count = 0
        posts.each do |p|
          post_json = {}
          post_json[:user] = p.user.name
          post_json[:text] = p.text
          post_json[:vote] = p.votes_count
          jFile.write(JSON.pretty_generate(post_json) + ",\n")

          votes = Vote.where(:post_id => p.id)
          puts "[VOTES COUNT #{votes.length}]"
          user_json = {}
          success_count = 0
          votes.each do |v|
            if !v.user.nil?
              user_json[:name] = v.user.name || " "
              user_json[:fbuid] = v.user.srv_uid || " "
              jFile.write(JSON.pretty_generate(user_json) + ",\n")            
              success_count = success_count + 1
            else 
              #puts v.user_id
            end
          end
          puts "[SUCCESS #{success_count}]"
        end
        jFile.close
      end


end


