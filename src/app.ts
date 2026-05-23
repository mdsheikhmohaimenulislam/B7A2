import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/auth/auth.routes";
import { issueRoute } from "./modules/issues/issues.routes";

const app: Application = express();

// MiddleWare
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server......!!");
});


app.use("/api/auth",userRoute)
app.use("/api/issues",issueRoute)


export default app;
