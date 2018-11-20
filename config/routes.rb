# == Route Map
#
# Prefix Verb   URI Pattern          Controller#Action
#  todos GET    /todos(.:format)     todos#index
#        POST   /todos(.:format)     todos#create
#   todo GET    /todos/:id(.:format) todos#show
#        PATCH  /todos/:id(.:format) todos#update
#        PUT    /todos/:id(.:format) todos#update
#        DELETE /todos/:id(.:format) todos#destroy
# 

Rails.application.routes.draw do
  namespace :api do
    resources :todos
  end

  get '*path', to: 'static_pages#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
