class AddPartNumberToProducts < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :messages, :users
    add_foreign_key :messages, :rooms
  end
end
