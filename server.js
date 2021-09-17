const express = require('express')
const cors = require('cors');
const app = express()


require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/logo'));
app.use('/static2', express.static(__dirname + '/cv'));

console.log(__dirname + '/logo')
app.use(cors());

app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`localhost:${process.env.PORT}`);
})

