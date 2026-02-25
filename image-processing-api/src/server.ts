
import express from 'express'
import imagesRoute from './routes/images'

const app = express()
const port = 3000

app.use('/api/images', imagesRoute)

app.get('/', (_req, res) => {
  res.send('Image Processing API is running')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app
