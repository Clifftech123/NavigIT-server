import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';


const app = express();


// setting the environment variables
config();

app.use(bodyParser.json());
app.use(cors());

// Define your routes here
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



// setting the server 

const Port =  process.env.PORT || 800;

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
})