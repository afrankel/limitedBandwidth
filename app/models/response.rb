class Response < ActiveRecord::Base
  serialize :result, JSON

  def self.save_result( api_id, result)
    Response.create(:api_id => api_id, :result => result)
  end
end
