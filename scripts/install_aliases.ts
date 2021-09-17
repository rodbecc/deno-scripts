import { existsSync } from "std/fs";
import { fromFileUrl, normalize } from "std/path";

import { appendToFile } from "/utils/file_handler.ts";
import { getShellConfigFullPath } from "/utils/shell_handler.ts";

function installAliases() {
  const shellConfigFilePath = getShellConfigFullPath();

  const paths = Deno.args.map((arg) =>
    fromFileUrl(normalize(`${import.meta.url}/../../aliases/${arg}`))
  );

  const validPaths = paths.filter((path) => existsSync(path));
  const commands = validPaths.map((scriptPath) => `source ${scriptPath}`);

  const commentLine = "# Denodarse - Aliases installed:";
  appendToFile(shellConfigFilePath, [commentLine, ...commands]);
}

installAliases();
