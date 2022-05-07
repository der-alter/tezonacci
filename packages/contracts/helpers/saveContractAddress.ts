import { outputFile } from 'fs-extra';

export default (name : string, address : string) =>
    outputFile(`${process.cwd()}/deployments/${name}.ts`, `export default "${address}";`);
