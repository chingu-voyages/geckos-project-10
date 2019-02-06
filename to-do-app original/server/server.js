var express = require('express')
var app = express()
const path = require('path')
const port = 3000

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/./client')));

// app.get('/client/index.html', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// res.sendFile(path.join(__dirname+'/client/index.html'))

