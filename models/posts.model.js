const mongoose = require('mongoose')
const Comments = require('../models/comments.model')
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

productSchema.pre("remove", async()=>{
    await Comments.remove({postId:this._id})
})

module.exports = mongoose.model('Posts', productSchema)
