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
end
