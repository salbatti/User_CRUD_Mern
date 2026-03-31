const express = require('express')
require('./config/db.js')
const cors = require('cors')

const route = require('./router/route')

const server = express()
server.use(cors())
server.use(express.json())
server.use(route)

server.get('/', (req, res) => {
    res.send('Print on web')
})
server.listen(3000, () => {
    console.log('Server running on port');

})