import * as fs from "fs";
import * as os from "os";
import * as uppercamelcase from "uppercamelcase";

function dfsDirs(
  uri: string,
  components: Object[],
  relativePath: string,
  exList: string[]
) {
  try {
    const dirs = fs.readdirSync(uri);
    dirs.forEach(function (dir: any) {
      const nUri = uri + "/" + dir;
      const nPath = relativePath + "/" + dir;
      const stat = fs.statSync(nUri);

      if (stat.isDirectory()) {
        dfsDirs(nUri, components, nPath, exList);
      }
      if (stat.isFile() && !exList.includes(nUri)) {
        const name = uppercamelcase(dir.split(".")[0]);
        components.push({
          name,
          path: nPath,
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function exComponentToFile(uri: string, components: Object[]) {
  const parseCompStr = components
    .map(function (c: any) {
      return `export { default as ${c.name} } from "${c.path}";`;
    })
    .join(os.EOL);
  const indexFilePath = uri + "/" + "index.js";

  fs.appendFileSync(indexFilePath, parseCompStr, {
    encoding: "utf8",
    flag: "w+",
  });
}

export default function main(uri: string): void {
  const components: Object[] = [];

  const indexFilePath = uri + "/" + "index.js";
  const exList = [indexFilePath];
  dfsDirs(uri, components, ".", exList);

  exComponentToFile(uri, components);
}
