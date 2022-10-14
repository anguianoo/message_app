class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name, :users, :messages
  # attribute :users do |room|
  #   UserSerializer.new(room.users.uniq).serializable_hash
  #  end
end
