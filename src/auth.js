const jwt=require("jsonwebtoken");
function signUser(user){return jwt.sign({sub:user.id,companyId:user.company_id,branchId:user.branch_id,role:user.role_code,name:user.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"12h"})}
function requireAuth(req,res,next){const token=req.headers.authorization?.replace(/^Bearer\s+/i,"");if(!token)return res.status(401).json({error:"يرجى تسجيل الدخول"});try{req.user=jwt.verify(token,process.env.JWT_SECRET);next()}catch{return res.status(401).json({error:"انتهت الجلسة أو رمز الدخول غير صالح"})}}
const allow=(...roles)=>(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({error:"ليست لديك صلاحية لتنفيذ هذه العملية"});
module.exports={signUser,requireAuth,allow};
