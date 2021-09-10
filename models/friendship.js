const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema(
   // The user who sent the request
    {
        from_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
        },

        //The user who recieves the request

        to_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
        }
    }, {
        timestamps:true,
    }
)

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;