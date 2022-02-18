const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    comment:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        required:false
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },

})

module.exports = mongoose.model('Comments', commentsSchema)