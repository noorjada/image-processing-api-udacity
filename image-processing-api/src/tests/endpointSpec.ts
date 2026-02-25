
import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe('GET /api/images', () => {
  it('returns 200 status', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    )
    expect(response.status).toBe(200)
  })
})
