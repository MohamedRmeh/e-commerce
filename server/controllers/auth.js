import User from '../models/User.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER
export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err)
}
};


// LOGIN
export const login = async (req,res,next) => {
  try {
      const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(401).json('Wrong credentials !');
        
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        )
        
            if(!isPasswordCorrect) return res.status(401).json("Wrong credentials !");

            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SEC)
            const {password, ...otherDetails} = user._doc;
            res.cookie("token", token, {
              }).status(200).json(otherDetails)

    } catch (err) {
        next(err)
    }
}

