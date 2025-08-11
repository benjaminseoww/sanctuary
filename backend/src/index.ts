import express, { Express, Request, Response } from "express";

import collectionsRouter from "@/controllers/collections";
import bookmarksRouter from "@/controllers/bookmarks";

const app: Express = express();
const PORT = 3001;

app.use(express.json());

// api definitions
const apiRouter = express.Router();
apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Sanctuary Backend API");
});

apiRouter.use("/collections", collectionsRouter);
apiRouter.use("/bookmarks", bookmarksRouter);

// app definitions
app.get("/", (req: Request, res: Response) => {
  res.send("Sanctuary Backend says Hi!");
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
