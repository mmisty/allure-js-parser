import { parseAllure } from '../../parser/parse';
import * as path from 'path';

describe('unit', () => {
  it('parseAllure - should be log when debug is on', () => {
    process.env.DEBUG = 'allure-js-parser:parse';

    const c = jest.spyOn(console, 'log');
    c.mockImplementation(() => {
      // nothing
    });

    parseAllure(path.resolve(`${process.cwd()}/src/tests/allure-data/simple`));
    expect(c.mock.calls).toEqual([]);
  });
});
