const fs = require("fs");
const path = require("path");
const buildDir = path.join(__dirname, "out");
const indexPath = path.join(buildDir, "index.html");

function moveFilesAndPathsToRoot(dir) {
  let pathsToChange = moveFilesToRoot(dir, []);
  console.log(pathsToChange);
  const css_paths = getCssFiles(buildDir);

  replaceWithRootPaths(indexPath, pathsToChange);

  css_paths.forEach((css_path) => {
    replaceWithRootPaths(css_path, pathsToChange);
  });
}

function replaceWithRootPaths(filePath, replacements) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    let modifiedData = data;
    replacements.forEach((fullPath) => {
      const searchValue = fullPath;
      const replaceValue = path.basename(fullPath);

      const regex = new RegExp(`["']${searchValue}["']`, "g");
      modifiedData = modifiedData.replace(regex, replaceValue);
    });

    fs.writeFile(filePath, modifiedData, "utf8", (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return;
      }
      console.log("File updated successfully");
    });
  });
}

function moveFilesToRoot(dir, visitedPaths) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    const relativePath = convertToRelativePath(fullPath, "/out");

    visitedPaths.push(relativePath);

    if (stats.isDirectory()) {
      moveFilesToRoot(fullPath, visitedPaths);
      fs.rmdirSync(fullPath);
    } else {
      const destPath = path.join(buildDir, path.basename(fullPath));
      fs.renameSync(fullPath, destPath);
    }
  });

  return visitedPaths;
}

function convertToRelativePath(absolutePath, targetDir) {
  if (typeof absolutePath !== "string" || typeof targetDir !== "string") {
    throw new Error("Both arguments must be strings");
  }

  const targetIndex = absolutePath.indexOf(targetDir);

  if (targetIndex === -1) {
    throw new Error("Target directory not found in the absolute path");
  }

  const relativePath = absolutePath.slice(targetIndex + targetDir.length);

  return relativePath;
}

function getCssFiles(dirPath) {
  let cssFiles = [];

  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(file) === ".css") {
      cssFiles.push(filePath);
    } else if (stat.isDirectory()) {
      cssFiles = cssFiles.concat(getCssFiles(filePath));
    }
  });

  return cssFiles;
}

moveFilesAndPathsToRoot(buildDir);
