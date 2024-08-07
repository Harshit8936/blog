const {Schema,model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true});


module.exports = model('blog',blogSchema)