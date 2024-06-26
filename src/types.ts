import { TestResult } from 'allure-js-commons/dist/cjs/src/new/model';
import type { StatusDetails, Parameter, Attachment, StepResult } from 'allure-js-commons';
import { Stage } from 'allure-js-commons';

export type AllureTestStatus = 'skipped' | 'passed' | 'failed' | 'broken' | 'unknown';

export const AllureStage = Stage;
export type AllureStep = StepResult;
export type AllureAttachment = Attachment;
export type AllureParameter = Parameter;
export type AllureStatusDetails = StatusDetails;
export type AllureTest = TestResult & {
  parent?: Parent;
};

export type AllureNode = AllureTest | AllureContainer | Parent;

export type AllureHook = {
  name: string;
  status: string;
  statusDetails: AllureStatusDetails;
  stage: 'finished' | string; // todo type when necessary
  steps: AllureStep[];
  attachments: AllureAttachment[];
  parameters: AllureParameter[];
};

/**
 * type of container from allure-results
 */
export type AllureContainer = {
  uuid: string;
  children: string[]; // uuids of tests or containers
  befores: AllureHook[];
  afters: AllureHook[];
  name: string;
  parent?: Parent;
};

export type Parent = {
  uuid: string;
  name: string;
  parent?: Parent;
  befores?: AllureHook[];
  afters?: AllureHook[];
};
