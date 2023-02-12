const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

/* Middleware */
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wjboujk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const userCollection = client.db("genesys").collection('users')



        /* Get all users from here */
        app.get('/users', async (req, res) => {
            const filter = {};
            const data = await userCollection.find(filter).toArray();
            res.send(data)
        })
        /* users insert here */
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

        app.delete('/users/:id', async (req, res) => {
            const result = await userCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(err => console.log(err))


app.get('/', async (req, res) => {
    res.send('Hey developer server is running')
})


app.listen(port, () => {
    console.log('server is running on this port', port)
})