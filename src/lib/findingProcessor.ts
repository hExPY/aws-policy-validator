import { ValidatePolicyCommandOutput } from '@aws-sdk/client-accessanalyzer';
import config from 'config';

const exceptions = config.get('exceptions');

const filterFindingsByAmountOfFindings = (findings: readonly {
  readonly policyName: string,
  readonly response: ValidatePolicyCommandOutput
}[]) =>
  findings.filter(finding => finding.response.findings.length > 0);

const filterFindingsByExceptions = (findings: readonly {
  readonly policyName: string,
  readonly response: ValidatePolicyCommandOutput
}[]) =>
  findings.map((findingObject) => {
      if (exceptions[findingObject.policyName]) {
        const filteredFindings = findingObject.response.findings.filter((finding) =>
          (exceptions[findingObject.policyName] && !exceptions[findingObject.policyName].includes(finding.issueCode))
        );
        return filteredFindings.length > 0 ? {
          policyName: findingObject.policyName,
          response: findingObject.response
        } : null;
      }
      return findingObject;
    }
  );

const countFilesWithError = (filteredFindings) => filteredFindings.reduce((accu, curr) => curr ? accu+1 : accu, 0)

const filter = (findings: readonly {
  readonly policyName: string,
  readonly response: ValidatePolicyCommandOutput
}[]) => {
  const nonEmptyFindings = filterFindingsByAmountOfFindings(findings);
  const filteredFindings = filterFindingsByExceptions(nonEmptyFindings)
  const filesContainingErrorCount = countFilesWithError(filteredFindings)

  return {filesContainingErrorCount, filteredFindings};
};

export default filter;
