const jwt = require('jsonwebtoken');
// temporario
const secret =  "kasdkajskdjaksdjaksjdkasjdkajsdjpkjspiad-02i-10231i0ida-skda-0skd0-12i-0ikas0dka-sdik-120i3-amsd-0ask-dokas-dklaoskdajsd-9wm,aklaksdnasd=asjdk";
class Authentication{
    constructor(){}
    async validate(req, res, next){
        console.log(req.body)
        console.log(req.headers.authorization);
        let token = req.headers.authorization;

        if(!token){
            return res.status(200).json({ status : 404, success : false,  msg : 'token não informado'})
        }
        try {
         const result  =  jwt.verify(token,  secret);
         console.log(result)
         next();
        } catch (error) {
            console.log('___'+ error)
            return res.status(401).json({ status : 500, success : false, msg : 'Token invalido...'})    
        }
    }
    async authentication(params, expire){
        try {
          return  jwt.sign({params}, secret, {expiresIn : expire}) //esta sendo usando no model usuario-login;
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new Authentication