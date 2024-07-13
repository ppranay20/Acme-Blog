const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authMiddleware = async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
        where : {
            id : decoded.id
        }
    })

    if(user){
        req.body.userId = user.id;
        next();
    }else{
        res.json({
            success : false,
            message : "Verification failed"
        })
    }
}

module.exports = {
    authMiddleware
}