import { populateAllParents } from '../../parser/parse';
import { AllureContainer, AllureTest, AllureStage } from '../../types';

describe('unit', () => {
  it('populateAllParents', () => {
    const cont1: AllureContainer = {
      uuid: '1',
      name: 'suite 1',
      children: ['2'],
      befores: [],
      afters: [],
    };

    const cont2: AllureContainer = {
      uuid: '2',
      name: 'suite 2',
      children: ['3', '4'],
      befores: [],
      afters: [],
    };

    const test3: AllureTest = {
      uuid: '3',
      name: 'Test #3',
      historyId: '34',
      labels: [],
      links: [],
      statusDetails: {
        message: undefined,
        trace: undefined,
      },
      stage: AllureStage.FINISHED,
      steps: [],
      attachments: [],
      parameters: [],
    };

    populateAllParents([cont1, cont2], test3);

    expect(test3).toEqual({
      attachments: [],
      historyId: '34',
      labels: [],
      links: [],
      name: 'Test #3',
      parameters: [],
      parent: {
        name: 'suite 2',
        uuid: '2',
        afters: [],
        befores: [],
        parent: {
          name: 'suite 1',
          uuid: '1',
          afters: [],
          befores: [],
        },
      },
      stage: 'finished',
      statusDetails: {},
      steps: [],
      uuid: '3',
    });
  });
});
