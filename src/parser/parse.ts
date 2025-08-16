import Debug from 'debug';
import { AllureContainer, AllureNode, AllureTest } from '../types';
import * as fs from 'fs';

const debug = Debug('allure-js-parser:parse');

const PACK = '[allure-js-parser]';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const glob = require('fast-glob');

// eslint-disable-next-line no-console
const debugLog = (...args: unknown[]) => debug(args);
const log = (...args: unknown[]) => console.log(`${PACK}`, ...args);

// eslint-disable-next-line no-console
const logError = (...args: unknown[]) => console.error(`${PACK}`, ...args);

function isResult(obj: Record<string, any>): obj is AllureTest {
  return !obj.children && obj.uuid && obj.name;
}

/**
 * Populate test results (without parent)
 * @param allureResultsPath - path to allure-results folder
 */
export const populateTestResults = (allureResultsPath: string): AllureTest[] => {
  const testCases: AllureTest[] = [];
  const resPattern = `${allureResultsPath}/*-result.json`;

  // get all tests first
  glob?.sync(resPattern).forEach((filePath: string) => {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const json = JSON.parse(fileContents) as AllureTest;

      if (!isResult(json)) {
        return;
      }
      // steps: []
      testCases.push({ ...json });
    } catch (err) {
      const e = err as Error;
      logError(`Error reading: '${filePath}': ${e.message}`);
    }
  });

  return testCases;
};

/**
 * Populate containers results (without parents)
 * @param allureResultsPath - path to allure-results folder
 */
export const populateContainers = (allureResultsPath: string): AllureContainer[] => {
  const containers: AllureContainer[] = [];

  // get all tests first
  glob?.sync(`${allureResultsPath}/*-container.json`).forEach((containerPath: string) => {
    try {
      const containerText = fs.readFileSync(containerPath);

      const containerJson = JSON.parse(containerText.toString()) as AllureContainer;
      containers.push(containerJson);
    } catch (err) {
      const e = err as Error;
      logError(`Error reading: '${containerPath}': ${e.message}`);
    }
  });

  return containers;
};

/**
 * Find parent within containers
 * @param containers
 * @param target
 */
export function populateAllParents(containers: AllureContainer[], target: AllureNode): void {
  const container = containers.find(container => container.children.some(c => c.includes(target.uuid)));

  if (container) {
    target.parent = {
      uuid: container.uuid,
      name: container.name,
      befores: container.befores,
      afters: container.afters,
    };

    populateAllParents(containers, target.parent);
  }
}

/**
 * Populate tests parents
 * @param testCases - path to allure-results folder
 * @param containers - path to allure-results folder
 */
const populateParents = (testCases: AllureTest[], containers: AllureContainer[]): AllureTest[] =>
  testCases.map(test => {
    populateAllParents(containers, test);

    return test;
  });

const exitWhenFailOnError = (failOnError: boolean, err?: string) => {
  if (failOnError) {
    log('Exiting with status 1, to disable set failOnError=false in config');
    throw new Error(err);
  } else {
    if (err) {
      logError(err);
    }
  }
};

export const parseAllure = (directoryPath: string, config?: { failOnError?: boolean, logError?: boolean }): AllureTest[] => {
  const env = process.env['failOnError'] !== undefined ? process.env.failOnError !== 'false' : false;

  const failOnError: boolean = config?.failOnError !== undefined ? config.failOnError : env;
  const logError: boolean = config?.logError ?? true;

  if (!fs.existsSync(directoryPath)) {
    exitWhenFailOnError(failOnError, logError ? `No allure-results folder: ${directoryPath}\n` : undefined);

    return [];
  }

  debugLog(`Reading ${directoryPath}...`);

  const pureTestCases = populateTestResults(directoryPath);
  const containers = populateContainers(directoryPath);

  if (pureTestCases.length === 0) {
    exitWhenFailOnError(
      failOnError,
      logError ? `No allure-results in folder (did you forgot to run tests?). Path '${directoryPath}'` : undefined,
    );

    return [];
  }

  // got all tests, getting all parents for test
  const tests = populateParents(pureTestCases, containers);
  debugLog('Done');

  return tests;
};
