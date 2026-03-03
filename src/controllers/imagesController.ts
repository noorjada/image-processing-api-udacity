
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import processImage from '../utilities/imageProcessor'

export const resizeImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const filename = req.query.filename as string
  const widthStr = req.query.width as string
  const heightStr = req.query.height as string

  // Validate filename parameter
  if (!filename) {
    res.status(400).json({ error: 'Missing filename parameter' })
    return
  }

  // Validate width parameter exists
  if (!widthStr) {
    res.status(400).json({ error: 'Missing width parameter' })
    return
  }

  // Validate height parameter exists
  if (!heightStr) {
    res.status(400).json({ error: 'Missing height parameter' })
    return
  }

  // Validate width is a valid number
  const width = parseInt(widthStr, 10)
  if (isNaN(width)) {
    res.status(400).json({ error: 'Invalid width value. Width must be a number' })
    return
  }

  // Validate height is a valid number
  const height = parseInt(heightStr, 10)
  if (isNaN(height)) {
    res.status(400).json({ error: 'Invalid height value. Height must be a number' })
    return
  }

  // Validate width is a positive number
  if (width <= 0) {
    res.status(400).json({ error: 'Invalid width value. Width must be greater than 0' })
    return
  }

  // Validate height is a positive number
  if (height <= 0) {
    res.status(400).json({ error: 'Invalid height value. Height must be greater than 0' })
    return
  }

  // Validate filename format (alphanumeric and underscores only)
  if (!/^[a-zA-Z0-9_-]+$/.test(filename)) {
    res.status(400).json({ error: 'Invalid filename. Filename must contain only alphanumeric characters, underscores, and hyphens' })
    return
  }

  const fullPath = path.resolve(`assets/full/${filename}.jpg`)
  const thumbPath = path.resolve(
    `assets/thumb/${filename}_${width}_${height}.jpg`
  )

  // Check if image file exists
  if (!fs.existsSync(fullPath)) {
    res.status(404).json({ error: 'Image file not found' })
    return
  }

  // Return cached thumbnail if it exists
  if (fs.existsSync(thumbPath)) {
    res.sendFile(thumbPath)
    return
  }

  try {
    await processImage(fullPath, thumbPath, width, height)
    res.sendFile(thumbPath)
  } catch (error) {
    console.error('Error processing image:', error)
    res.status(500).json({ error: 'Error processing image' })
  }
}
