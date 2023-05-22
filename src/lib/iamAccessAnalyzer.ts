import {
  AccessAnalyzerClient,
  PolicyType,
  ValidatePolicyCommand
} from '@aws-sdk/client-accessanalyzer';

const client = () => new AccessAnalyzerClient({ region: "us-east-1" });
const validatePolicy = async (policyName: string, policyDocument: string) => {
  const accessAnalyzerClient = client();
  const parameters = {
    policyDocument,
    policyType: PolicyType.SERVICE_CONTROL_POLICY
  }
  const accessAnalyzerCommand = new ValidatePolicyCommand(parameters);
  const response = await accessAnalyzerClient.send(accessAnalyzerCommand);
  return { policyName, response };
}

export default validatePolicy;
