const express = require('express')
const app = express()
const PORT = 5500

app.listen(PORT, ()=>{
    console.log(`[CONNECTED] Server : http://localhost:${PORT}`)
})

app.get('/', (req, res)=>{
    res.send("Express server (project created by easy-project)")
})