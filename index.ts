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
let isCreated = false;
let cors = require("cors");
app.use(cors());
//routes

app.post("/data",async (req: Request, res: Response) => {
  postData = req.body.data;
  // console.log(postData.experience);
  postData.experience.forEach((obj:any)=>{
    
    if(obj.endDate!=="Present"){
      // console.log(`${obj.endDate[0]} ${obj.endDate[1]}`);
      // {{endDate.[0]}} {{endDate.[1]}}
      obj.endDate = `${obj.endDate[0]} ${obj.endDate[1]}`
    }
    console.log(obj);
  })
 await PdfController(postData);
  console.log('pdf generated');
  console.log(postData);
    var file = fs.createReadStream("./resume.pdf");
    var stat = fs.statSync("./resume.pdf");
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
    file.pipe(res);
    console.log('download sent');
});

app.get("/", (req: Request, res: Response) => {
  // PdfController();
  res.send("Server for resumes");
});

// app.get("/download", (req: Request, res: Response) => {
//   setTimeout(()=>{
//     var file = fs.createReadStream("./resume.pdf");
//     var stat = fs.statSync("./resume.pdf");
//     res.setHeader("Content-Length", stat.size);
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
//     file.pipe(res);
//     console.log('download sent');
//   },3000)

// });

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
