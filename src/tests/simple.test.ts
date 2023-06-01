import { someUseful as localtest } from '../index';
import { someUseful } from 'allure-ts-parser';

describe('simple-suite', () => {
  it('simple-test', async () => {
    localtest();
  });
});

describe('simple-suite', () => {
  it('simple-test', async () => {
    someUseful();
  });
});
