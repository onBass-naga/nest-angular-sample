import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SamplesModule } from './../../src/samples/samples.module';
import { INestApplication } from '@nestjs/common';

describe('SamplesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SamplesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/samples (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/samples')
      .expect(200, {message: 'Hello world!'}, done);
  });

  it('/samples/:id/details/:detailId (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/samples/1/details/7')
      .expect(200, {
        detailId: '7',
        id: '1',
      }, done);
  });

  it('/samples/params/:id/:detailId (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/samples/params/1/x77')
      .expect(200, {
        params: {
          id: '1',
          detailId: 'x77',
        },
      }, done);
  });

  it('/samples/queries (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/samples/queries?id=1&statuses[]=pendding&statuses[]=completed')
      .expect(200, {
        id: '1',
        statuses: [ 'pendding', 'completed' ],
      }, done);
  });

  it('/samples/queries2dto (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/samples/queries2dto?id=1&statuses[]=pendding&statuses[]=completed')
      .expect(200, {
        query: {
          id: '1',
          statuses: [ 'pendding', 'completed' ],
        },
      }, done);
  });

  it('/samples/user (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/samples/user')
      .send(`{
        "name": "Bugs Bunny",
        "contact": {
          "emails": ["foo@example.com", "bar@example.com"],
          "phoneNumber": "0000-00-0000"
        }
      }`)
      .set('Content-Type', 'application/json')
      .expect(202, {
        name: 'Bugs Bunny',
        contact: {
          emails: ['foo@example.com', 'bar@example.com'],
          phoneNumber: '0000-00-0000',
        },
      }, done);
  });

  it('/samples/header (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/samples/header')
      .set('Content-Type', 'application/json')
      .set('X-Auth-Token', 'abcdefg')
      .expect(202, { authToken: 'abcdefg' }, done);
  });
});
