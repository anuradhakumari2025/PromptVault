const jwt = require("jsonwebtoken")
const User = require("../models/auth.model")

module.exports.authUser = async(req,res,next)=>{
  try {
    const token = req.cookies.token
    if(!token){
      // return res.redirect("/login")
      return res.status(401).json({message:"Login please,invalid token"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({message:"Invalid token"})
  }
}