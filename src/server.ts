import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
const port = 3000;
import { Pool } from "pg";

// MiddleWare
app.use(express.json());

const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_fF9DSyd6nQUO@ep-red-silence-apwzc4ys-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'contributor' CHECK(role IN ('contributor', 'maintainer')),


      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      ) 
      `);
    console.log("DataBase Connected Successfully..!");
  } catch (error) {}
};
initDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Express Server......!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
