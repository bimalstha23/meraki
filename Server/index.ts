import express, { Express, Request, Response } from 'express';
const app: Express = express();
import * as env from 'dotenv'
import sequelize from './src/DbConnection';
env.config();


const port = process.env.PORT;



app.get("/", (req: Request, res: Response) => {
    res.send("server started");
})

app.get('/hello', (req, res) => {
    res.send("stfu")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
