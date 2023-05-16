const { describe, it, after, before } = require('mocha');
const request = require('supertest');
const assert = require('assert');

let app;

describe('API Suite test', () => {
  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });

  after(done => app.close(done));

  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app)
                        .get('/contact')
                        .expect(200);

      assert.strictEqual(response.text, 'Contact us page');
    })
  });
  
  
  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
                        .post('/login')
                        .send({ username: 'vini', password: '123' })
                        .expect(200);

      assert.strictEqual(response.text, 'Logging has succeeded!');
    })

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
                        .post('/login')
                        .send({ username: 'vini wrong', password: '123' })
                        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, 'Logging failed!');
    })
  });

  describe('/contact2', () => {
    it('should request an inexistent route /contact2 and return not found', async () => {
      const response = await request(app)
                        .get('/contact2')
                        .expect(404);

      assert.strictEqual(response.text, 'Not found!');
    })
  });
})