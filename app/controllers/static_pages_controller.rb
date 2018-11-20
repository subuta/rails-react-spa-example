# SEE: https://qiita.com/studioTeaTwo/items/486eb19c549c32ee3c88
class StaticPagesController < ActionController::Base
  def index
    render file: 'public/index.html'
  end
end