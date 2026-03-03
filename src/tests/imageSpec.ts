
import fs from 'fs'
import processImage from '../utilities/imageProcessor'

describe('Image Processing', () => {
  it('Resizing an image that doesn\'t exist', async () => {
    try {
      await processImage(
        'assets/full/nonexistent.jpg',
        'assets/thumb/test_nonexistent.jpg',
        200,
        200
      )
      expect(true).toBe(false) // Should not reach here
    } catch {
      expect(true).toBe(true) // Should throw an error
    }
  })

  it('A thumbnail should exist after resizing', async () => {
    try {
      // Create a test thumbnail by processing an existing image
      await processImage(
        'assets/full/fjord.jpg',
        'assets/thumb/fjord_thumbnail.jpg',
        200,
        200
      )

      expect(fs.existsSync('assets/thumb/fjord_thumbnail.jpg')).toBeTrue()

      // Cleanup
      if (fs.existsSync('assets/thumb/fjord_thumbnail.jpg')) {
        fs.unlinkSync('assets/thumb/fjord_thumbnail.jpg')
      }
    } catch (error) {
      // If processing fails, fail the test
      expect(true).toBe(false)
    }
  })
})
