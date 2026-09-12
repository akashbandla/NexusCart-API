import AuthService from "../services/auth.service.js";

const authService = new AuthService();

async function registerUser(req, res){
    try{

        const {name, email, role, password} = req.body;

        if(!name || !email || !password){
            throw new Error("Name, email and password should required!")
        }

        let newUser = {}

        if(name !== undefined) newUser.name = name;
        if(email !== undefined) newUser.email = email;
        if(role !== undefined) newUser.role = role;
        if(password !== undefined) newUser.password = password;

        const registeredUser = await authService.registerUser(newUser);

        if(!registeredUser){
            res.status(400).json("User not registered");
        }

        res.status(201).json({
            message: "User Registered successfully",
            user:registeredUser
        })
    }catch(err){
        res.json(err.message);
    }
}

async function login(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error("Email and password are required to Login");
        }

        const result = await authService.login(email, password);

        res.cookie(
            'refreshToken',
            result.refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "PRODUCTION",
                samesite: "lax",
                path: '/api/auth'
            }
        )

        res.status(200).json({
            message: "User Authenticated Successfully",
            user: result.user,
            accessToken: result.accessToken
        });
    }catch(err){
        res.json(err.message);
    }
}

export {
    registerUser,
    login
}
