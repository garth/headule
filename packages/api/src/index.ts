import { server } from './server'

server.start().catch((error) => {
  console.error(error)
})
