
const unprotectedRoutes = [
    "/auth/register",
    "/auth/login",
    "/graphql"
];

const authenticate = async (req, res, next) => {
        
    try {
        const token = req.cookies?.jwtToken || ""
        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified)
        req.verifiedUser = verified.user;
        console.log(request)
    } catch(err){

        if (unprotectedRoutes.includes(req.path)){
            next()
        } else {
            res.redirect("/auth/login")
        }
    }
}

module.exports = { authenticate }