import mysql from "mysql2/promise";
import "dotenv/config";
const required=["DB_HOST","DB_USER","DB_PASSWORD","DB_NAME"];
for(const key of required) if(!process.env[key]) throw new Error(`Missing MySQL environment variable: ${key}`);
export const pool=mysql.createPool({host:process.env.DB_HOST,port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:true,connectionLimit:Number(process.env.DB_CONNECTION_LIMIT||10),queueLimit:0,decimalNumbers:true,timezone:"Z"});
export async function tx(work){const c=await pool.getConnection();try{await c.beginTransaction();const result=await work(c);await c.commit();return result}catch(e){await c.rollback();throw e}finally{c.release()}}
