class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  NotAuthorized = Class.new(StandardError)
  def current_user
    user = User.find_by(id: session[:user_id])
    if user.nil?
      session[:user_id] = nil
      redirect_to '/login'
    else
      user
    end
  end

  def login(email, password)
    password = BCrypt::Password.create(password)
    user = User.where("email = '#{email}' AND password_digest = '#{password}'")
    user[0]
  end

  def redirect_to_login
    redirect_to '/' if current_user.nil?
  end

  def authorize
    redirect_to '/login' unless current_user
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render_error_page(status: 404, text: 'Not found')
  end

  rescue_from ApplicationController::NotAuthorized do |exception|
    render_error_page(status: 403, text: 'Forbidden')
  end

  private

  def render_error_page(status:, text:, template: 'errors')
    respond_to do |format|
      format.json { render json: { errors: [message: "#{status} #{text}"] }, status: status }
      format.html { render template: "#{template}/#{status}", status: status, layout: false }
      format.any  { head status }
    end
  end
end
