import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe('Testing Endpoints', () => {
  it('Test /api/endpoint returns 200 status code', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200',
    )
    expect(response.status).toBe(200)
  })

  it('Test /api/images endpoint returns API is up', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200',
    )
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })

  it('Test /api/images endpoint returns error (filename is missing)', async () => {
    const response = await request.get('/api/images?width=200&height=200')
    expect(response.status).toBe(400)
  })

  it('Test /api/images endpoint returns 200 status updates', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=300&height=300',
    )
    expect(response.status).toBe(200)
  })
})
