class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  # attribute :rooms do |user|
  #   # user.rooms.uniq
   
  # end
end
