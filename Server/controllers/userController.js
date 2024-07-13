const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const zod = require('zod');

const signUpSchema = zod.object({
    username  : zod.string().optional(),
    email  : zod.string(),
    password : zod.string().min(6)
})

const signInSchema = zod.object({
    email  : zod.string().email(),
    password : zod.string().min(6)
})

const signup =async (req,res) => {
    const datas = req.body;

    const {success} = signUpSchema.safeParse(datas);
    
    if(!success){
        return res.json({
            success : false,
            message : "Wrong Inputs"
        })
    }


    try{
        const existUser = await prisma.user.findUnique({
            where : {
                email : datas.email
            },
        })

        if(existUser){
            return res.json({
                success : false,
                message : "User Already Exists"
            })
        }

        const hashsedPassword = await bcrypt.hash(datas.password,10);

        const user = await prisma.user.create({
            data : {
                username : datas.username,
                email : datas.email,
                password : hashsedPassword
            }
        })

        const token = jwt.sign({id : user.id},process.env.JWT_SECRET)

        res.json({
            token : "Bearer "+ token,
            success : true,
            message : "User Created Successfully"
        })
    }catch(err){
        console.log(err)
    }
}

const signin = async (req,res) => {
    const datas = req.body;

    const {success} = signInSchema.safeParse(datas);
    
    if(!success){
        return res.json({
            success : false,
            message : "Wrong Inputs"
        })
    }

    try{
        const user = await prisma.user.findUnique({
            where : {
                email : datas.email
            }
        })

        if(!user){
            return res.json({
                success : false,
                message : "Incorrect emai or password"
            })
        }

        const isUser = await bcrypt.compare(datas.password,user.password);
        if(!isUser){
            return res.json({
                success : false,
                message : "Wrong password"
            })
        }

        const token = await jwt.sign({id : user.id},process.env.JWT_SECRET)

        res.json({
            token : "Bearer " + token,
            success : true,
            message : "Logged In Successfully"
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    signup,
    signin
}