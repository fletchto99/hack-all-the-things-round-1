Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get '/' => 'pages#index'
  get '/about' => 'pages#about'
  get '/login' => 'sessions#new', as: :login
  get '/pages/:cmd' => 'pages#return_html_pages', as: :return_html_pages
  post   '/login' => 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
