import { getParentsArray, getRootSuite, getSummary } from '../../parser/helpers';
import { AllureTest } from '../../types';
import { parseAllure } from '../../parser/parse';
import path from 'path';

describe('helpers', () => {
  let res: AllureTest[];

  beforeEach(() => {
    res = parseAllure(path.resolve(`${process.cwd()}/src/tests/allure-data/helpers`));
  });

  it('summaryNumbers', () => {
    const counts = getSummary(res);

    expect(counts).toEqual({
      failed: 1,
      passed: 3,
      skipped: 0,
      broken: 0,
      unknown: 0,
    });
  });

  it('getParentsArray', () => {
    const counts = res.map(t => ({ name: t.name, parents: getParentsArray(t).map(p => p.name) }));

    expect(counts).toEqual([
      {
        name: 'should be red',
        parents: ['tomato', 'fruits'],
      },
      {
        name: 'should have stick',
        parents: ['apples', 'fruits'],
      },
      {
        name: 'no suite test',
        parents: [],
      },
      {
        name: 'should wight ~100-400 gramms',
        parents: ['apples', 'fruits'],
      },
    ]);
  });

  it('summaryNumbers with filter', () => {
    const counts = getSummary(res, t => t.name?.indexOf('should have') !== -1);

    expect(counts).toEqual({
      failed: 0,
      passed: 1,
      skipped: 0,
      broken: 0,
      unknown: 0,
    });
  });

  it('getRootSuite', () => {
    const roots = res.map(t => ({ name: t.name, parent: getRootSuite(t) }));

    expect(roots).toEqual([
      {
        name: 'should be red',
        parent: {
          name: 'fruits',
          uuid: '9e2ffca6-3141-472a-b3c8-c2d9c3a233cf',
          afters: [],
          befores: [],
        },
      },
      {
        name: 'should have stick',
        parent: {
          name: 'fruits',
          uuid: '9e2ffca6-3141-472a-b3c8-c2d9c3a233cf',
          afters: [],
          befores: [],
        },
      },
      {
        name: 'no suite test',
      },
      {
        name: 'should wight ~100-400 gramms',
        parent: {
          name: 'fruits',
          uuid: '9e2ffca6-3141-472a-b3c8-c2d9c3a233cf',
          afters: [],
          befores: [],
        },
      },
    ]);
  });

  it('getRootSuite - undefined', () => {
    const roots = getRootSuite(undefined);

    expect(roots).toEqual(undefined);
  });
});
