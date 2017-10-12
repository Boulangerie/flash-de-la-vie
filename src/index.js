import { Api } from './api'
import { Socket } from './socket'
import { DrumbForEverScore } from './score/drumbForEver'

// Api to serve public folder ... (8080)
const api = new Api()
api.start()

// SocketIO (4000)
const socket = new Socket()
socket.start()

// My song (for real my favorite!!)
const scoreDrumbDumbDrumbDumb = new DrumbForEverScore()
socket.play(scoreDrumbDumbDrumbDumb)
