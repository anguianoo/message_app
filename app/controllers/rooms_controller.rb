class RoomsController < ApplicationController
  
    def index
      # rooms = Room.all
      # render json: rooms
      current_user = User.find(session[:user_id])
      
      rooms = current_user.rooms
      render json:rooms
    end

    # GET /rooms/:id
    def show
      room = Room.find(params[:id])

      render json: room
    end

    def create
      # binding.pry
      room = Room.create(room_params)
      allUsers = User.all
      user = User.find_by(id: session[:user_id])
      room.users << allUsers
      
      ActionCable.server.broadcast 'rooms_channel', room
      render json: room
      
      # room = user.rooms.new(room_params)
      
      # if room.save
      #   add_users_to_room
      #   # render json: room, status: :created
      #   
      #   render json: {
      #     room: room,
      #     users: room.users
      #   }
      # else
      #   render json: { message: 'Unable to create room Please try again.'}
      # end
      
      
      
      # room = Room.create(room_params)

      # render json: room, status: :created

    end

    # Patch /rooms/:id
    def update
        room = find_room
        room.update(room_params)
        render json: room
    end
    
    def destroy
        room = find_room
        room.destroy
        head :no_content
    end

    private

    # def add_users_to_room   
    #   # user = User.find_by(id: session[:user_id])
    #   # @room.users << user
    #   # params[:users].each do |name|
    #   #   @user = User.find_by(username: name)
    #   #   (room.users << user) unless room.users.include?(user) 
      
    # end
  

    def find_room
      Room.find(params[:id])
    end

    def room_params
      params.permit(:name, :is_private)
    end
  
    def render_not_found_response
      render json: { error: "Room not found" }, status: :not_found
    end
end
