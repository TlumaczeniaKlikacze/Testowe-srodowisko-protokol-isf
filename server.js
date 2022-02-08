const express = require('express')
const fs = require('fs')
const app = express()
const crypto = require('crypto')
app.use(express.urlencoded({ extended: true }));
const manifest = fs.readFileSync('./manifest.xml','utf-8')

app.get('/manifest',(req,res)=>{
    res.header("Content-Type", "application/xml");
    res.status(200).send(manifest);
})

app.post('/iai',(req,body)=>{
    // Pisałem też serwer w języku go, ale otrzymywałem dokładnie to samo w body
    console.log(req.body)
    console.log(Object.keys(req.body))
    const keysInBody = Object.keys(req.body)
    const valueInBody = req.body[keysInBody[0]]
    // łączac klucz z wartościa mogę stworzyć obiekt ale nie idzie tego shashować i sprawdzić klucza
    // Zachodzą małe zmiany podczas JSON.parse np "Pu\u0142awy" od razu zamienia na "Puławy" 
    console.log(valueInBody)
    const wholeObj = `${keysInBody}: ${valueInBody}`
    const jsonObj = JSON.parse(wholeObj)
    console.log(jsonObj)
    const privateKey = 'test'
    const cryptoISF = crypto.createHash('sha256').update(jsonObj.isf).digest('hex')
    const time = jsonObj.time
    const user = jsonObj.user
    //Sposób hashowania według dokumentacji
    const ourHash = crypto.createHash('sha256').update(user+cryptoISF+privateKey+time).digest('hex')

    const hashFromIai = jsonObj.hash
    //sposób hashowania
})
app.listen(3000,()=>{
    console.log('port 3000 server')
})