class RoomsChannel < ApplicationCable::Channel
    def subscribed
      stop_all_streams
      room = Room.find(params[:room])
      stream_for room
    end
  
    def received(data)
      RoomsChannel.broadcast_to(room, { room: room, users: room.users, messages: room.messages })
    end
  
    def unsubscribed
      stop_all_streams
    end
  end