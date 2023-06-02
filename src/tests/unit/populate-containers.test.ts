import { populateContainers } from '../../parser/parse';
import * as path from 'path';
import { AllureContainer } from '../../types';

describe('unit', () => {
  let res: AllureContainer[];

  beforeEach(() => {
    res = populateContainers(path.resolve(`${process.cwd()}/src/tests/allure-data/simple`));
  });

  it('populateContainers - should be 2 containers', () => {
    expect(res.length).toEqual(2);
  });

  it('populateContainers - should be 2 containers names', () => {
    expect(res.map(t => t.name)).toEqual(['apples', 'fruits']);
  });

  it('populateContainers - full', () => {
    expect(res).toEqual([
      {
        afters: [],
        befores: [],
        children: ['523b0bed-891f-4f7a-91d2-c1f52af87b32', '0843001b-832b-4621-a096-17a64642ef20'],
        name: 'apples',
        uuid: '25d4c594-8978-4e65-9698-a83022ab4068',
      },
      {
        afters: [],
        befores: [],
        children: ['25d4c594-8978-4e65-9698-a83022ab4068'],
        name: 'fruits',
        uuid: '3318fde9-9137-4f60-8111-5454f8c62262',
      },
    ]);
  });
});
