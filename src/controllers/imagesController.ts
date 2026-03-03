
import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import processImage from '../utilities/imageProcessor'

export const resizeImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const filename = req.query.filename as string
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)

  if (!filename || !width || !height) {
    res.status(400).send('Missing or invalid parameters')
    return
  }

  const fullPath = path.resolve(`assets/full/${filename}.jpg`)
  const thumbPath = path.resolve(
    `assets/thumb/${filename}_${width}_${height}.jpg`
  )

  if (!fs.existsSync(fullPath)) {
    res.status(404).send('Image not found')
    return
  }

  if (fs.existsSync(thumbPath)) {
    res.sendFile(thumbPath)
    return
  }

  try {
    await processImage(fullPath, thumbPath, width, height)
    res.sendFile(thumbPath)
  } catch {
    res.status(500).send('Error processing image')
  }
}
