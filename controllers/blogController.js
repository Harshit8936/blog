const BlogModel = require('../models/Blog');
const CommentModel = require('../models/Comment');



const AddBlogPage = (req,res,next)=>{
    return res.render("addBlog",{user:req.user})
}


const insertNewBlog = async(req,res,next)=>{
    try {
    const image = req.file.filename;
    const {title,description} = req.body;
    let blogSave = new BlogModel({title,description,imageUrl:`/uploads/${image}`,createdBy:req.user.id});
    const blogObj = await blogSave.save();
    return res.redirect(`/`)
    } catch (error) {
        return res.redirect("/")
    }
}

const viewblogById = async(req,res,next)=>{
    try {
    const id = req.params.id;
    const findBlog = await BlogModel.findById(id).populate('createdBy');
    const commentsbyBlogId =await CommentModel.find({blogId:id}).populate('createdBy');
    res.render("viewBlog",{
        user:req.user,
        blog:findBlog,
        comments:commentsbyBlogId
    })
    // return res.redirect(`/${blogObj._id}`)
    } catch (error) {
        return res.redirect("/")
    }
}

const commentblogById = async(req,res,next)=>{
    try {
    const {comment} = req.body;
    const commentSave = new CommentModel({comment,createdBy:req.user.id,blogId:req.params.blogId});
    const blogObj = await commentSave.save();
    return res.redirect(`/view/${req.params.blogId}`)
    } catch (error) {
        return res.redirect("/")
    }
}


module.exports = {AddBlogPage,insertNewBlog,viewblogById,commentblogById}