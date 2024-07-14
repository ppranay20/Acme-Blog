const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const zod = require('zod');

const createPostSchema = zod.object({
    title : zod.string(),
    content : zod.string(),
    category : zod.string()
})


const createPost = async (req,res) => {
    const datas = req.body.data;
    const id = req.body.userId

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
                category : datas.category,
                authorId : id
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

const getPost = async (req,res) => {
    const postId = req.params.id;

    try{
        const post = await prisma.post.findFirst({
            where : {
                id : postId
            },
            select : {
                content : true,
                title : true,
                category : true,
                PublishedOn : true,
                Author : {
                    select : {
                        username : true
                    }
                }
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
        const posts = await prisma.post.findMany({
            select : {
                content : true,
                title : true,
                id : true,
                category : true,
                PublishedOn : true,
                Author : {
                    select : {
                        username : true
                    }
                }
            }
        });
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
    getPost,
    getAllPost
}