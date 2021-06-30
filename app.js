// https://expressjs.com/ja/starter/hello-world.html
// https://expressjs.com/en/resources/middleware/cors.html
const express = require('express')
const cors = require('cors')
const File = require('./file.js')

const file = new File('retry.txt')
const port = 3333
const forceRetryCount = 3

const app = express()
app.use(cors())

file.init()

app.get('/', (req, res) => {
  const count = parseInt(file.read())

  if (count < forceRetryCount) {
    // axios-retry のリトライ条件に当てはまるよう500を返す
    // https://github.com/softonic/axios-retry/blob/master/es/index.js#L63
    res.status(500).send({ count })
    file.write(count+1)
    return
  }

  res.send({ count })
})

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})
