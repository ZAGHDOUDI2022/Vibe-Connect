const UserModel = require('../models/user.modal')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
    //console.log(req.body)
  const {username, password, firstname, lastname} = req.body
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const oldUser = await UserModel.findOne({ username });
  if (oldUser){
      return res.status(400).json({ message: "User already exists" })}
      else{
  try {

    const user = await UserModel.create({username, password:hashedPass, firstname, lastname });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(201).json({ user,token:token});
  }
  catch(err) {
    
    res.status(200).send(err)
  }
}
}

module.exports.signIn = async (req, res) => {
  const {username, password} = req.body

  try {
      const user = await UserModel.findOne({username: username})


      if(user)
      {
          const validity = await bcrypt.compare(password, user.password)


          if (!validity) {
            res.status(400).json("wrong password");
          } else {
            const token =createToken(user._id,username);
            res.cookie('jwt', token, { httpOnly: true, maxAge});
            res.status(201).json({ user: user._id,token:token});
          }
      }
      else{
          res.status(404).json("User does not exists")
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

