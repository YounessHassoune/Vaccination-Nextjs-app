import { connect } from "mongoose"

const connection: any = {}
const Connect = async () => {
  const DATABASE_URL = process.env.DATABASE_URL as string
  if (connection.isConnected) {
    return
  }
  const db = await connect(DATABASE_URL).catch(err => {
    const message = `😵 Error connecting to database: ${err.message}`
    // eslint-disable-next-line no-console
    console.error(message)
  })
  connection.isConnected = db!.connections[0].readyState
}

export default Connect
