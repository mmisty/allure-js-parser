import { parseAllure } from '../../parser/parse';
import * as path from 'path';
import { AllureTest } from '../../types';

describe('unit', () => {
  let res: AllureTest[];

  beforeEach(() => {
    res = parseAllure(path.resolve(`${process.cwd()}/src/tests/allure-data/simple`));
  });

  it('parseAllure - should be 2 tests', () => {
    expect(res.length).toEqual(2);
  });

  it('parseAllure - should be 2 tests', () => {
    expect(res.map(t => t.name)).toEqual(['should wight ~100-400 gramms', 'should have stick']);
  });

  it('parseAllure - should be have labels', () => {
    expect(res.map(t => ({ [`${t.name}`]: t.labels.map(l => ({ [`${l.name}`]: l.value })) }))).toEqual([
      {
        'should wight ~100-400 gramms': [
          { thread: '01' },
          { package: 'fruits.apples' },
          { parentSuite: 'fruits' },
          { suite: 'apples' },
          { framework: 'JEST overridden' },
          { language: 'typescript/javascript' },
          { host: 'Taisias-MacBook-Pro-579.local' },
        ],
      },
      {
        'should have stick': [
          { thread: '01' },
          { tag: 'regression' },
          { package: 'fruits.apples' },
          { parentSuite: 'fruits' },
          { suite: 'apples' },
          { framework: 'JEST overridden' },
          { language: 'typescript/javascript' },
          { host: 'Taisias-MacBook-Pro-579.local' },
        ],
      },
    ]);
  });

  it('parseAllure - filter', () => {
    expect(res.filter(t => t.start && t.start < 1685684498584).map(t => t.fullName)).toEqual([
      'fruits apples should have stick',
    ]);
  });

  it('parseAllure - filter labels', () => {
    expect(
      res.filter(t => t.labels.some(t => t.name === 'tag' && t.value === 'regression')).map(t => t.fullName),
    ).toEqual(['fruits apples should have stick']);
  });

  it('parseAllure - steps', () => {
    expect(res.map(t => ({ [`${t.name}`]: t.steps.map(s => s.name) }))).toEqual([
      {
        'should wight ~100-400 gramms': ['2023-06-02 05:41:38.585 | NON_DEFAULT'],
      },
      {
        'should have stick': ['2023-06-02 05:41:38.568 | NON_DEFAULT'],
      },
    ]);
  });

  it('parseAllure - full', () => {
    expect(res).toEqual([
      {
        attachments: [],
        fullName: 'fruits apples should wight ~100-400 gramms',
        historyId: 'c1586ad8-4dc1-5ba0-88c4-793f3636a961',
        labels: [
          {
            name: 'thread',
            value: '01',
          },
          {
            name: 'package',
            value: 'fruits.apples',
          },
          {
            name: 'parentSuite',
            value: 'fruits',
          },
          {
            name: 'suite',
            value: 'apples',
          },
          {
            name: 'framework',
            value: 'JEST overridden',
          },
          {
            name: 'language',
            value: 'typescript/javascript',
          },
          {
            name: 'host',
            value: 'Taisias-MacBook-Pro-579.local',
          },
        ],
        links: [],
        name: 'should wight ~100-400 gramms',
        parameters: [],
        parent: {
          name: 'apples',
          parent: {
            name: 'fruits',
            uuid: '3318fde9-9137-4f60-8111-5454f8c62262',
            afters: [],
            befores: [],
          },
          uuid: '25d4c594-8978-4e65-9698-a83022ab4068',
          afters: [],
          befores: [],
        },
        stage: 'finished',
        start: 1685684498584,
        status: 'passed',
        statusDetails: {},
        steps: [
          {
            attachments: [],
            name: '2023-06-02 05:41:38.585 | NON_DEFAULT',
            parameters: [],
            stage: 'finished',
            start: 1685684498585,
            status: 'passed',
            statusDetails: {},
            steps: [],
            stop: 1685684498585,
          },
        ],
        stop: 1685684498586,
        uuid: '0843001b-832b-4621-a096-17a64642ef20',
      },
      {
        attachments: [],
        fullName: 'fruits apples should have stick',
        historyId: 'e66fdf04-03b5-5235-9e12-a14a415316f8',
        labels: [
          {
            name: 'thread',
            value: '01',
          },
          {
            name: 'tag',
            value: 'regression',
          },
          {
            name: 'package',
            value: 'fruits.apples',
          },
          {
            name: 'parentSuite',
            value: 'fruits',
          },
          {
            name: 'suite',
            value: 'apples',
          },
          {
            name: 'framework',
            value: 'JEST overridden',
          },
          {
            name: 'language',
            value: 'typescript/javascript',
          },
          {
            name: 'host',
            value: 'Taisias-MacBook-Pro-579.local',
          },
        ],
        links: [],
        name: 'should have stick',
        parameters: [],
        parent: {
          name: 'apples',
          parent: {
            name: 'fruits',
            uuid: '3318fde9-9137-4f60-8111-5454f8c62262',
            afters: [],
            befores: [],
          },
          uuid: '25d4c594-8978-4e65-9698-a83022ab4068',
          afters: [],
          befores: [],
        },
        stage: 'finished',
        start: 1685684498567,
        status: 'passed',
        statusDetails: {},
        steps: [
          {
            attachments: [],
            name: '2023-06-02 05:41:38.568 | NON_DEFAULT',
            parameters: [],
            stage: 'finished',
            start: 1685684498568,
            status: 'passed',
            statusDetails: {},
            steps: [],
            stop: 1685684498569,
          },
        ],
        stop: 1685684498583,
        uuid: '523b0bed-891f-4f7a-91d2-c1f52af87b32',
      },
    ]);
  });
});
