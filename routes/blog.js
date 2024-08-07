const { AddBlogPage,insertNewBlog,viewblogById,commentblogById } = require('../controllers/blogController');

const router = require('express').Router();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })


router.get("/addblog",AddBlogPage);
router.post("/postblog",upload.single('imageUrl'),insertNewBlog);
router.get("/view/:id",viewblogById);
router.post("/comment/:blogId",commentblogById);


module.exports = router