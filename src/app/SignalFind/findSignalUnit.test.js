// jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');
const oracledb = require('oracledb');

const request = require('supertest');
const express = require('../../../config/express');

const app = express();
const findDao = require('./findDao');
const database = require('../../../config/database');
const findProvider = require('./findProvider');

// const { logger } = require('../../../config/winston');

describe('시그널 찾기 유닛 테스트', () => {
  describe('PATCH /signalFind', () => {
    test.only('내 근처 10km 내 시그널 ON인 유저 가져오는 함수 로직 테스트', async () => {
      const loginUserIdx = 1;
      const signalOnUsers = [{"userIdx" : 1}, {"userIdx" : 2}, {"userIdx" : 3}];

      const result = findProvider.getNearSignalONList(loginUserIdx, signalOnUsers);

      console.log(result);
      expect(result).toEqual([{"userIdx" : 2}])
    });
  });
});
