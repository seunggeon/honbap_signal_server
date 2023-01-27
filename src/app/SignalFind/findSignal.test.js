const request = require('supertest')
const app = require('../app')

describe('시그널 찾기 통합 테스트', () => {
  describe('PATCH /signalFind', () => {
      test('내 위치가 수정되는지 확인', async () => {
        const res = await request(app)
        .patch('/signalFind')
        .set('Accept', 'application/json') //header field
        .then((res) => {
          expect(res.body[i].is_reported).toEqual(0);
        });
      });
  });

  describe('GET /signalFind/list', () => {
      test('거리 범위 외 시그널도 리스트에 뜨는지 확인', async () => {
        const res = await request(app)
        .get('/signalFind/list')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.headers['content-type']).toMatch('/json');
          for (let i = 0; i < res.body.length; i++) {
              expect(res.body[i].is_reported).toEqual(0);
          }
        })
      });
      test('거리 범위 외 시그널도 리스트에 뜨는지 확인', async () => {
        const res = await request(app)
        .get('/signalFind/list')
        .set('Accept', 'application/json')
        .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.headers['content-type']).toMatch('/json');
              for (let i = 0; i < res.body.length; i++) {
                expect(res.body[i].is_reported).toEqual(0);
              }
        })
      });
      test('꺼진 시그널도 리스트에 뜨는지 확인', async () => {
        const res = await request(app)
        .get('/signalFind/list')
        .set('Accept', 'application/json')
        .then((res) => {
            expect(res.status).toEqual(200);
            expect(res.headers['content-type']).toMatch('/json');
            for (let i = 0; i < res.body.length; i++) {
              expect(res.body[i].is_draft).toEqual(0);
            }
        });
      });
      test('시그널이 최신 순으로 뜨는지 확인', async () => {
        const res = await request(app)
        .get('/signalFind/list')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.headers['content-type']).toMatch('/json');
          for (let i = 0; i < res.body.length; i++) {
              expect(res.body[i].is_draft).toEqual(0);
          }
        });
    });
  });
})
