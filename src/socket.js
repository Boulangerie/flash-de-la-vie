import { Server } from 'hapi'

export class Socket {

  constructor() {
    this.server = new Server()
    this.server.connection({ port: 4000 })

    this.io = require('socket.io')(this.server.listener)

    this.score = null

    this.currentTickInterval = setInterval(this.tick.bind(this), 3000)
  }

  tick() {
    if (this.score && !this.score.pause) {
      console.log([this.score.currentPosition, this.score.note])
      this.io.emit('heartbeat', JSON.stringify([this.score.currentPosition, this.score.note]))
      this.score.tick()
    }
  }

  start() {
    this.io.on('connection', (socket) => {
      console.log('A user connected!')
      socket.emit('hello', 'Hey you, what\'s up?!')

      if (this.score) {
        socket.emit('score', JSON.stringify(this.score))
      }
    })
    this.server.start()
  }

  pause() {
    this.score.pause()
  }

  play(score) {
    if (score) {
      if (this.score) {
        this.score.reset()
      }
      this.score = score
      this.io.emit('score', JSON.stringify(this.score))
    } else {
      this.score.play()
    }      
  }

}