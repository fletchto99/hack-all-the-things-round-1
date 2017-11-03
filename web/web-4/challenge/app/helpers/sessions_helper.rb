# Session helper
module SessionsHelper
  def logged_in?
    @current_user ||= User.find_by(id: session[:user_id])
    !@current_user.nil?
  end
end
