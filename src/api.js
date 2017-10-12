import { Server } from 'hapi'
import * as Path from 'path'
import * as Inert from 'inert'

export class Api {
  
  constructor() {
    this.server = new Server()
    this.server.connection({ 
      host: process.env.API_HOST || '0.0.0.0',
      port: process.env.API_PORT || 8080
    })
  }

  async start() {
    await this.server.register(Inert)
    this.server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'public'),
          index: true
        }
      }
    })
    await this.server.start()
    console.log('Server running at:', this.server.info.uri)
  }

}