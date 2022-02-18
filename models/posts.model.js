const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default:0
    },
    date:{
        type: Date,
        required:true
    },
    comments:[{
        commentId: { 
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Comments'
        },
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Posts', productSchema)
