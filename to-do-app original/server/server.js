var express = require('express')
var app = express()
const port = 3000


app.get('/', (req, res) => res.sendFile('index.html', {root: './public/'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// app.use(express.static(path.join(__dirname, 'dist')));
