
import express from 'express'
import { resizeImage } from '../controllers/imagesController'

const router = express.Router()

router.get('/', resizeImage)

export default router
