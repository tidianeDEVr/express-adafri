const express = require('express')
const cors = require('cors')
const app = express()
const billboardsRouter = require("./routes/billboards-router")
const ussdRouter = require("./routes/ussd-router")
const smsRouter = require("./routes/sms-router")
const voiceRouter = require("./routes/voice-router")
const renderRouter = require("./routes/render-router")


app.use(express.json())
app.use(cors())
app.set("view engine", "ejs")

app.use('/api/billboards', billboardsRouter)
app.use('/api/ussd', ussdRouter)
app.use('/api/sms', smsRouter)
app.use('/api/voice', voiceRouter)
app.use('/render', renderRouter)

app.listen(3000)