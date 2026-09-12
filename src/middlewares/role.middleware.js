async function adminOnly(req, res, next){
    try{
        const isAdmin = req.user?.role === 'admin';
        if(!isAdmin){
            return res.status(403).json({
                message: "Access Denied!. You are not authorized to access this Resource"
            })
        }

        next();
    }catch(err){
        return res.status(403).json({
            message: "Access Denied"
        })
    }
}

export default adminOnly;