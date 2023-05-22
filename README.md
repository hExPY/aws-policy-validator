# AWS Policy Validator

## Abstract

The AWS Policy Validator utilizes the AWS Access Analyzer API to validate policies.

I wrapped this API in a convenience feature that enables you to define exceptions.

## Usage

- Clone this repository
- Update `config/default.json` to reflect your actual values
- Install dependencies `yarn`
- Make sure your defined AWS profile is logged in and has the policy `access-analyzer:ValidatePolicy` attached
- Start the validation `yarn start`

## Example
```shell
# Clone this repository
git clone https://github.com/hExPY/aws-policy-validator.git
cd aws-policy-validator

# Install dependencies using yarn
yarn

# Start the validation
yarn -s start | jq
{
  "level": "info",
  "message": {
    "filesContainingErrorCount": 1,
    "filteredFindings": [
      {
        "policyName": "my_scp_file.scp.json",
        "response": {
          "$metadata": {
            "attempts": 1,
            "httpStatusCode": 200,
            "requestId": "xxxxxxxx-yyyy-mmmm-nnnn-zzzzzzzzzzzz",
            "totalRetryDelay": 0
          },
          "findings": [
            {
              "findingDetails": "The effect Denys is not valid. Use Allow or Deny.",
              "findingType": "ERROR",
              "issueCode": "INVALID_EFFECT",
              "learnMoreLink": "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-reference-policy-checks.html#access-analyzer-reference-policy-checks-error-invalid-effect",
              "locations": [
                {
                  "path": [
                    {
                      "value": "Statement"
                    },
                    {
                      "index": 2
                    },
                    {
                      "value": "Effect"
                    }
                  ],
                  "span": {
                    "end": {
                      "column": 310,
                      "line": 1,
                      "offset": 310
                    },
                    "start": {
                      "column": 303,
                      "line": 1,
                      "offset": 303
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      null
    ]
  }
}



```

## Todos

- Add "real" logging level
- Implement real exit level
- Improve code - it's actually chaos right now
- Add tests
- Add container for convenience usage
- Add types and define them
- Add automatic pipeline for testing and image building
- More convenience feature (call for help, maybe you have an idea)
