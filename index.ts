import express, { Application, Request, Response } from "express";
// import { stat } from 'node:fs/promises';
import PdfController from "./controllers/PdfController";
const app: Application = express();
const port = process.env.PORT || 8080;
const fs = require("fs-extra");
//middleware for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let postData;
let cors = require("cors");
app.use(cors());
//routes

app.post("/data", (req: Request, res: Response) => {
  postData = req.body.data;
  console.log(postData);
  PdfController(postData);
});

app.get("/", (req: Request, res: Response) => {
  // PdfController();
  res.send("Server for resumes");
});

app.get("/download", (req: Request, res: Response) => {
  var file = fs.createReadStream("./resume.pdf");
  var stat = fs.statSync("./resume.pdf");
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  file.pipe(res);
  console.log('download sent');
  
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
