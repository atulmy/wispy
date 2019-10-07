// Imports
import socket from 'socket.io-client'

// App imports
import { URL_API } from './env'

// Socket
const subscription = socket(`${ URL_API }/subscription`)

export default subscription
