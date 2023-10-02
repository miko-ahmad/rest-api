const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 3001
const routes = require('./routes/index')


app.use(bodyParser.json())
app.use(cors({credentials : true, origin: '*'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', routes )

app.listen(port, () =>{
    console.log(`server running on port ${port}`);
})  