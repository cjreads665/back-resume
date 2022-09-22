import express , {Application, Request, Response} from 'express';
import PdfController from './controllers/PdfController'
const app: Application = express()
const port = process.env.PORT || 8080;

//middleware for body-parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes

app.get('/', (req:Request, res:Response) => {
    PdfController()
    res.send('Server for resumes');
  });








try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error:any) {
    console.error(`Error occured: ${error.message}`);
}