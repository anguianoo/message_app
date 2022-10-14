class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    wrap_parameters format: []


    # GET /users
    def index
        users = User.all
        render json: users, except: [:created_at, :updated_at]
    end

 # POST /users
    def create
        user = User.create(user_params)
        #  if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
  
    end
    
    # Patch /users/:id
    def update
      user = find_user
      user.update(user_params)
      render json: user
    end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end


    # GET /user/:id
    def show
      user = User.find_by(id: session[:user_id])
      render json: user, status: :ok
    end

    private

    def find_user
      User.find(params[:id])
    end

    def user_params
      params.permit(:username, :password, :password_confirmation, :email)
    end

    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end


end
