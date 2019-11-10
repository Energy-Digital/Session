const express = require('express')

const port = 3000
const fs = require('fs')
const path = require('path')
const resolve = file =>path.resolve(__dirname, file)
const app = express()
const {version} = require('./package.json')

app.use('/',express.static(resolve('./example')));

fs.copyFileSync(`./dist/session.v${version}.min.js`, `./example/session.v${version}.min.js`, (res) => {
    console.log('success remove')
})

app.listen(port, function(){
    console.log(`nodejs server is running on port ${port}`)
})

