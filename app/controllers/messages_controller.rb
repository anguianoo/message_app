class MessagesController < ApplicationController
    before_action :authorize
  
    def index
      messages = Message.all
      render json: messages
    end
  
    def create
      # user = User.find_by(params[:user_id])
      # message = user.messages.new(messages_params)

      message = Message.new(messages_params)
  
      if message.save
        room = message.room
        broadcast room
      end
      render json: message
    end
  
    def update
      message = Message.find(params[:id])
      message.update(messages_params)
      room = message.room
      # broadcast room
      render json: message
    end
  
    def destroy
      message = Message.find_by(id: params[:id])
      if message.delete
        room = message.room
        broadcast room
      end
      head :no_content
    end
  
    private
  
    def messages_params
      params.require(:message).permit(:message_body, :user_id, :room_id)
    end
  
    def broadcast(room)
      RoomsChannel.broadcast_to(room, {
        room: room,
        users: room.users,
        messages: room.messages,
      })
    end
  end