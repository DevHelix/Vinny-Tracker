// node index.js -> ngrok http 8000 -> reload pages

const http = require('http')
const { WebSocketServer } = require('ws')
const { spawn } = require('child_process')

const server = http.createServer()
const wsServer = new WebSocketServer({ server })
const port = 8000

const py = spawn(String.raw`C:\Users\vince\AppData\Local\Python\pythoncore-3.14-64\python.exe`, [String.raw`C:\Users\vince\OneDrive\Desktop\Projects\Vinny Tracker\server\track.py`])

// When Python prints, broadcast to all connected browsers
py.stdout.on('data', (data) => {
    wsServer.clients.forEach(client => {
        client.send(data.toString())
    })
})

server.listen(port, () => {
    console.log(`Ws server running on ${port}`)
})


wsServer.on('connection', (ws) => {
    console.log('Browser connected')
})