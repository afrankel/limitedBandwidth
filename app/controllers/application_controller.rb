class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
  end

  def api_call
    t = params[:t] || 60

    sleep(t.to_i)
    render :json => "Completed".to_json
  end

  def api_call_with_id
    t = params[:t] || 60
    id = params[:id] # used to identify the unique calling of this api
    retry_it = params[:retry] # if retry is set then just get the result from the database
    not_found_in_db = true

    if retry_it
      # get from db based on id
      client_response = Response.find_by_api_id("#{session.id}:#{id}")
      if client_response
        not_found_in_db = false # since we found it just return the original result
        render :json => client_response.result
      end
    end

    if not_found_in_db
      sleep(t.to_i)

      # first save off the results before returning in case the client connection is lost
      # use the combination of the sessionID + ":" + api_id
      # in real world case we would just return the same result
      Response.save_result("#{session.id}:#{id}", "Completed. Result retrieved from database. API id: #{id}".to_json)

      render :json => "Completed by server".to_json
    end
  end
end
