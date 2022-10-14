class AddForeignsToRoomUsers < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :room_users, :users
    add_foreign_key :room_users, :rooms
  end
end
