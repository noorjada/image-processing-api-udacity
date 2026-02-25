
import processImage from '../utilities/imageProcessor'
import fs from 'fs'

describe('Image Processing Function', () => {
  it('should resize image successfully', async () => {
    await processImage(
      'assets/full/fjord.jpg',
      'assets/thumb/test.jpg',
      200,
      200
    )

    expect(fs.existsSync('assets/thumb/test.jpg')).toBeTrue()
  })
})
