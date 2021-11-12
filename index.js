import express from 'express';
import mongoose from 'mongoose';
import Post from './Post.js';


const PORT  = 5000;
const DB_URL = `mongodb+srv://user:user@cluster0.fqgbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express();

app.use(express.json())

app.post('/', async (req, res) => {

    try {
        console.log(req.body)
        const  {author, title, content, picture} = req.body
        const post = await Post.create({author, title, content, picture})
        
        res.json(post)

    } catch (e) {
            res.status(500).json(e)

    }
   
    
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL , {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log('server start' , PORT);
        })

    } catch (e) {
        console.log(e);
    }
}

startApp()

