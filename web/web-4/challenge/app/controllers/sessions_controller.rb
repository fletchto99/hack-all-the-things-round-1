class SessionsController < ApplicationController
  before_action :authenticate_user, except: [:new, :create, :destroy]
  # layout 'index_layout', only: [:new, create]
  include SessionsHelper

  def new
    @user = User.new
    render 'new' # if current_user.nil?
  end

  def create
    # byebug
    @user = login(params[:session][:email].downcase, params[:password])
    if @user.nil? && session[:user_id].nil?
      flash.now[:error] = 'Invalid email or password'
      render 'new', status: :unauthorized
    else
      session[:user_id] = @user.id
      redirect_to '/'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end
end
