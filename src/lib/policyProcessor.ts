import { readdirSync, readFileSync} from 'fs';

import config from 'config';

const { path, extension } = config.get('policies')
const getFileContentFromDisk = (policyName: string) => JSON.parse(
  readFileSync(`${path}/${policyName}`).toString()
)
const getFilesList = () => readdirSync(path).filter(
  filename => filename.endsWith(extension)
);

const process = () => {
  const policies = getFilesList();
  return policies.reduce((previousValue, currentValue) => (
    {...previousValue, [currentValue]: getFileContentFromDisk(currentValue)}
  ), {})
}

export default process;
