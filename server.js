const express = require('express')
const cors = require('cors');
const app = express()


require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`localhost:${process.env.PORT}`);
})

