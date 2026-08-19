const fs=require("node:fs/promises");
const path=require("node:path");
const bcrypt=require("bcryptjs");
const {pool}=require("./db.js");

async function main(){
  const sql=await fs.readFile(path.join(__dirname,"schema.sql"),"utf8");
  const statements=sql.split(/;\s*(?:\n|$)/).map(s=>s.trim()).filter(Boolean);
  for(const statement of statements)await pool.query(statement);
  await pool.query("INSERT IGNORE INTO roles(code,name_ar) VALUES ('ADMIN','مدير النظام'),('ACCOUNTANT','محاسب'),('WAREHOUSE','موظف مخزن'),('SALES_REP','مندوب مبيعات')");
  let [[company]]=await pool.query("SELECT id FROM companies LIMIT 1");
  if(!company){
    const[r]=await pool.query("INSERT INTO companies(name,legal_name) VALUES (?,?)",["CosmetiCore","CosmetiCore Cosmetics"]);
    company={id:r.insertId};
    await pool.query("INSERT INTO branches(company_id,name,address) VALUES (?,?,?)",[company.id,"الفرع الرئيسي","بغداد"]);
    await pool.query("INSERT INTO warehouses(company_id,branch_id,name) VALUES (?,1,?)",[company.id,"المخزن الرئيسي"]);
  }
  const [[role]]=await pool.query("SELECT id FROM roles WHERE code='ADMIN'");
  const [[branch]]=await pool.query("SELECT id FROM branches WHERE company_id=? LIMIT 1",[company.id]);
  const email=process.env.ADMIN_EMAIL;const password=process.env.ADMIN_PASSWORD;
  if(!email)throw new Error("ADMIN_EMAIL is required for database initialization");
  if(!password||password.length<12)throw new Error("ADMIN_PASSWORD must contain at least 12 characters");
  const [[exists]]=await pool.query("SELECT id FROM users WHERE email=?",[email]);
  if(!exists){
    const hash=await bcrypt.hash(password,12);
    await pool.query("INSERT INTO users(company_id,branch_id,role_id,name,email,password_hash) VALUES (?,?,?,?,?,?)",[company.id,branch.id,role.id,process.env.ADMIN_NAME||"System Admin",email,hash]);
  }
  console.log("Database initialized successfully");
  await pool.end();
}

main().catch(async error=>{console.error("Database initialization failed:",error.message);await pool.end();process.exit(1)});
