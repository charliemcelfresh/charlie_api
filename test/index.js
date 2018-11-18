/* eslint-env mocha */
const expect = require('chai').expect;

const supertest = require('supertest');
const config = require('../config');
const app = require('../index');
const db = require('../db');

const request = supertest(app);

const jsonApiOrgString = config.get('jsonApiOrgString');
const validApiToken = 'valid_token';

if (config.get('env') !== 'test') {
  throw new Error('tests must be run in "test" env"');
}

function requestBody(token) {
  return {
    data: {
      attributes: {
        data: {
          some: 'data',
        },
      },
      type: 'events',
      api_token: token,
    },
  };
}

describe('GET /healthcheck', () => {
  it('returns "ok"', (done) => {
    request.get('/healthcheck')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done(err);
      });
  });
});

describe('api/v1/events with a valid api_token in the request', () => {
  before((done) => {
    db.query('DELETE FROM api_tokens');
    db.query('INSERT INTO api_tokens (token, revoked) values($1, false)', [validApiToken]);
    try {
      done();
    } catch (e) {
      console.log(e);
    }
  });

  describe('POST /api/v1/events with valid headers', () => {
    it('returns 201 status', () => {
      request.post('/api/v1/events')
        .send(requestBody(validApiToken))
        .set('Accept', jsonApiOrgString)
        .set('Content-Type', jsonApiOrgString)
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.eq(201);
        });
    });
  });

  describe('POST /api/v1/events with a valid Content-Type, but invalid Accept header', () => {
    it('returns 406 status', () => {
      request.post('/api/v1/events')
        .send(requestBody(validApiToken))
        .set('Accept', jsonApiOrgString)
        .expect(406)
        .end((err, res) => {
          expect(res.status).to.eq(406);
        });
    });
  });

  describe('POST /api/v1/events with a valid Accept header, and invalid Content-Type header', () => {
    it('returns 406 status', () => {
      request.post('/api/v1/events')
        .send(requestBody(validApiToken))
        .set('Content-Type', jsonApiOrgString)
        .expect(406)
        .end((err, res) => {
          expect(res.status).to.eq(406);
        });
    });
  });
});

describe('api/v1/events with an invalid api_token in the request', () => {
  before((done) => {
    db.query('DELETE FROM api_tokens');
    db.query('INSERT INTO api_tokens (token, revoked) values($1, false)', [validApiToken]);
    try {
      done();
    } catch (e) {
      console.log(e);
    }
  });

  describe('POST /api/v1/events', () => {
    it('returns a 401 status', () => {
      request.post('/api/v1/events')
        .send(requestBody(validApiToken))
        .set('Accept', jsonApiOrgString)
        .set('Content-Type', jsonApiOrgString)
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.eq(401);
        });
    });
  });
});

describe('api/v1/events with a revoked api_token in the request', () => {
  before((done) => {
    db.query('DELETE FROM api_tokens');
    db.query('INSERT INTO api_tokens (token, revoked) values($1, false)', [validApiToken]);
    try {
      done();
    } catch (e) {
      console.log(e);
    }
  });

  describe('POST /api/v1/events', () => {
    it('returns a 401 status', () => {
      request.post('/api/v1/events')
        .send(requestBody(validApiToken))
        .set('Accept', jsonApiOrgString)
        .set('Content-Type', jsonApiOrgString)
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.eq(401);
        });
    });
  });
});

after((done) => {
  db.query('DELETE FROM api_tokens');
  done();
  app.stop();
});
