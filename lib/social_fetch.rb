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

        return {} if json.blank? or json["email"].blank?
        json["email"]

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

end


