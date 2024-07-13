const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const zod = require('zod');

const createPostSchema = zod.object({
    title : zod.string(),
    content : zod.string()
})

const updatePostSchema = zod.object({
    title : zod.string().optional(),
    content : zod.string().optional()
})

const createPost = async (req,res) => {
    const datas = req.body;

    const {success} = createPostSchema.safeParse(datas);
    if(!success){
        return res.json({
            sucess : false,
            message : "Wrong inputs"
        })
    }
    
    try{
        const post = await prisma.post.create({
            data : {
                title : datas.title,
                content : datas.content,
                authorId : datas.userId
            }
        })
        res.json({
            success : true,
            message : "Post Created Successfully"
        })
    }catch(err){
        console.log(err)
    }
}

const updatePost = async (req,res) => {
    const datas = req.body;

    const {success} = createPostSchema.safeParse(datas);
    if(!success){
        return res.json({
            sucess : false,
            message : "Wrong inputs"
        })
    }

    try{
        const updatePost = await prisma.post.update({
            where : {
                id : datas.id,
                authorId : datas.userId
            },
            data : {
                title : datas.title,
                content : datas.content
            }
        })
    
        res.json({
            posts : updatePost,
            success : true,
            message : "Post Updated Successfully"
        })
    }catch(err){
        console.log(err)
    }
}

const getPost = async (req,res) => {
    const postId = req.params.id;

    try{
        const post = await prisma.post.findUnique({
            where : {
                id : postId
            }
        })

        res.json({
            post : post,
            success : true
        })
    }catch(err){
        console.log(err)
    }
}

const getAllPost = async (req,res) => {
    try{
        const posts = await prisma.post.findMany();
        res.json({
            success : true,
            posts : posts
        })
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    createPost,
    updatePost,
    getPost,
    getAllPost
}