import * as fs from 'fs';

export function countFiles(path: string, filter: (name: string) => boolean): number {

  return fs
    .readdirSync(path)
    .filter(filter)
    .length
    ;
}

export function fileExtensionFilter(extension: string): (n: string) => boolean {
  return (name: string) => {
    const split = name.split('.');

    return !!(split && (split[1] === extension));
  };
}
export function countKeyOccurrenceInFiles(paths: string[], query: string|RegExp): number {

  let count = 0;

  paths.forEach(path => {

    const fileContent = fs.readFileSync(path).toString();
    const regex = new RegExp((query as RegExp).source || query as string, 'g');
    let match;

    // tslint:disable:no-conditional-assignment
    while (match = regex.exec(fileContent)) count++;
  });

  return count;
}
