const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
// Sign Up 
router.post("/signup", async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
const newUser = new User({
    username: req.body.username,
    email: req.body.email, 
    password: hashed
   
})
const token = jwt.sign(
    { user_id: newUser._id, email: req.body.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  newUser.token = token;
const user = await newUser.save();
return res.status(200).json(user);
    }catch(err){
        console.log(err)
       return res.status(500).json(err);
    }
});


//login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if(!user) {
          return res.status(400).json("Wrong credentials!");
      }
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
      return res.status(400).json("Wrong credentials!");
      }
      const token = jwt.sign(
        { user_id: user._id, email :user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      try {
      user.save();
      }catch(err) {
        return res.send(err);
      }
      const { password, ...others } = user._doc;
      console.log(user.token)
      return res.status(200).json(user.token);
    } catch (err) {
     return res.send(err);
    }
  });

module.exports = router;