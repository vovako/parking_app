import { JWTmiddleware } from '../middleware/authJWT.js'
import auth from './auth.js'
import cabinet from './cabinet.js'
import reserv from './reserv.js'
import review from './review.js'

export function SetApi(app){
    app.use('/auth',auth)
    app.use('/api',JWTmiddleware)
    app.use('/api/cabinet',cabinet)
    app.use('/api/reservation',reserv)
    app.use('/api/review',review)
}