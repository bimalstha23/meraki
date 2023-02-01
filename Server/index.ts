// import express from 'express';
import express, { Express, Request, Response } from 'express';
const app: Express = express();

const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
    res.send("server started");
})

app.get('/hello',(req,res)=>{
    res.send("stfu")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

