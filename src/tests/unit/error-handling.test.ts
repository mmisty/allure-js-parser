import { parseAllure } from '../../parser/parse';
import path from 'path';

describe('unit', () => {
  it('should return no results when not existing path', () => {
    const res = parseAllure(path.resolve(`${process.cwd()}/src/tests/not-exist`));
    expect(res).toEqual([]);
  });

  it('should throw when when not existing path and faile on error ', () => {
    const res = () => parseAllure(path.resolve(`${process.cwd()}/src/tests/not-exist`), { failOnError: true });
    expect(res).toThrow(/No allure-results folder: .*\/src\/tests\/not-exist/);
  });

  it('should throw when when no results in path', () => {
    const res = () => parseAllure(path.resolve(`${process.cwd()}/src/tests/allure-data/empty`), { failOnError: true });
    expect(res).toThrow(
      /No allure-results in folder \(did you forgot to run tests\?\)\. Path '.*\/allure-data\/empty'/,
    );
  });

  it('should throw when when no results in path', () => {
    const res = () =>
      parseAllure(path.resolve(`${process.cwd()}/src/tests/allure-data/fail-container`), { failOnError: true });
    expect(res).toThrow(
      /No allure-results in folder \(did you forgot to run tests\?\)\. Path '.*\/allure-data\/fail-container'/,
    );
  });

  it('should not throw when process has failOnError false', () => {
    process.env.failOnError = 'false';
    const res = () => parseAllure(path.resolve(`${process.cwd()}/src/tests/not-exist`));
    expect(res()).toEqual([]);
  });

  it('should throw when process has failOnError true', () => {
    process.env.failOnError = 'true';
    const res = () => parseAllure(path.resolve(`${process.cwd()}/src/tests/not-exist`));
    expect(res).toThrow(/No allure-results folder: .*\/src\/tests\/not-exist/);
  });
});
