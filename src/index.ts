import filter from './lib/findingProcessor';
import validatePolicy from './lib/iamAccessAnalyzer';
import logger from './lib/logging';
import policyProcessor from './lib/policyProcessor';

(async function() {
  const policiesFromDisk = policyProcessor();

  const validatedPolicies = Object.keys(policiesFromDisk).map(async (policyName) =>
    validatePolicy(policyName, JSON.stringify(policiesFromDisk[policyName]))
  );

  const allFindings = await Promise.all(validatedPolicies).then((values) => values);

  const filteredFindings = filter(allFindings);

  logger.info(filteredFindings)
})()
