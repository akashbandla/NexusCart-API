import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils.js";

class AuthService{

    async registerUser(user){
        try{
            if(!user){
                throw new Error("User data is required to register");
            }

            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
            
            const registeredUser = await User.create(user);

            if(!registeredUser){
                throw new Error("User is not registered")
            }

            return {
                _id : registeredUser._id,
                name : registeredUser.name,
                email : registeredUser.email,
                role : registeredUser.role
            }
        }catch(err){
            return err
        }
    }

    async login(email, password){
        try{
            const user = await User.findOne({
                email:email
            }).select('+password');

            if(!user){
                throw new Error("Invalid Credentials");
            }
            const hashedPassword = user.password;
            const isValid = await bcrypt.compare(password, hashedPassword);

            if(!isValid){
                throw new Error('Invalid Credentials');
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            return{
                user:{
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role : user.role
                },
                accessToken,
                refreshToken
            }
        }catch(err){
            throw err;
        }
    }

}

export default AuthService;