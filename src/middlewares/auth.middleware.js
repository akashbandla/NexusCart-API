import { verifyAcessToken } from "../utils/jwt.utils.js";

async function authenticate(req, res, next){
    try{
        const authheader = req.headers.authorization;
        if(!authheader){
            return res.status(401).json({message: "Token required to access resource"});
        }

        if(!authheader.startsWith("Bearer ")){
            return res.status(401).json({message:"Invalid Token Format"})
        }
        const token = authheader.split(' ')[1];

        const decoded = verifyAcessToken(token);

        req.user = decoded;

        next();
    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({
                message: 'Token Expired'
            })
        }

        if(err.name === "JsonWebTokenError"){
            return res.status(401).json({
                message: 'Invalid token'
            })
        }

        return res.status(401).json({ message: 'Authentication failed' });
    }
}

export default authenticate
