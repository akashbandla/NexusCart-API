import  jwt  from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;



function generateAccessToken(user){
    return jwt.sign(
        {
            _id : user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        JWT_ACCESS_SECRET,
        {
            expiresIn:JWT_ACCESS_EXPIRES_IN
        }
    )
}

function generateRefreshToken(user){
    return jwt.sign(
        {
            _id : user._id,
            role: user.role
        },
        JWT_REFRESH_SECRET,
        {
            expiresIn:JWT_REFRESH_EXPIRES_IN
        }
    )
}

function verifyAcessToken(token){
    return jwt.verify(
        token, 
        JWT_ACCESS_SECRET
    )
}

function verifyRefreshToken(token){
    return jwt.verify(
        token, 
        JWT_REFRESH_SECRET
    )
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAcessToken,
    verifyRefreshToken
}