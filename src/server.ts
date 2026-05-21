import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config/env";
import { initDB } from "./config/db";
const app: Application = express();
const port =config.port;


// MiddleWare
app.use(express.json());


initDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Express Server......!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
