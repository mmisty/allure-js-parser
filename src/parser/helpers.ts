import { AllureContainer, AllureNode, AllureTest, AllureTestStatus, Parent } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isContainer(obj: Record<string, any>): obj is AllureContainer {
  return !obj.fullName;
}

/**
 * Get root container
 * @param node - test or container
 */
export const getRootSuite = (node?: AllureNode): Parent | undefined => {
  if (node?.parent) {
    return getRootSuite(node.parent);
  }

  if (node && !isContainer(node)) {
    return undefined;
  }

  return node;
};

export const getSummary = (
  res: AllureTest[],
  filter?: (test: AllureTest) => boolean,
): { [key in AllureTestStatus]: number } => {
  return res.reduce(
    (acc, curr) => {
      if ((!filter && curr.status) || (filter && filter(curr) && curr.status)) {
        acc[`${curr.status}`]++;
      }

      return acc;
    },
    { passed: 0, failed: 0, skipped: 0, broken: 0, unknown: 0 },
  );
};

/**
 * Get parents into array, first - closes parent of the test
 * @param node - test or container
 * @param res - results
 */
export const getParentsArray = (node?: AllureNode, res: Parent[] = []): Parent[] => {
  if (node?.parent) {
    res.push(node.parent);

    return getParentsArray(node.parent, res);
  }

  if (node && !isContainer(node)) {
    return res;
  }

  return res;
};
