import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();

// MiddleWare
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server......!!");
});

export default app;
