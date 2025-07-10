const adminAuth = (req,res , next) => {
    const token = "xyz"
    const isAuthorise = token === "xyz"
    if(!isAuthorise){
       res.status(401).send("Unauthorise user !");
    }else{
        next();
    }
}

module.exports = {adminAuth} 