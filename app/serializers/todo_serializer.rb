# == Schema Information
#
# Table name: todos
#
#  id         :integer          not null, primary key
#  title      :string
#  is_done    :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :is_done
end
