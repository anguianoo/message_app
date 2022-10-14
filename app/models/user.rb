class User < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :rooms, through: :messages

    has_many :room_users, dependent: :destroy
    has_many :rooms, through: :room_users
    has_secure_password
    
    validates :username, presence: true, uniqueness: true
    # validates :email, presence: true, uniqueness: true
    # validates :password, presence: true, length: {in: 6..20}
end
