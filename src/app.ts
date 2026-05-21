import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/users/users.route";
const app: Application = express();

// MiddleWare
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server......!!");
});


app.use("/api/auth/signup",userRoute)


export default app;
