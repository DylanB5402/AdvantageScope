// Copyright (c) 2021-2026 Littleton Robotics
// http://github.com/Mechanical-Advantage
//
// Use of this source code is governed by a BSD
// license that can be found in the LICENSE file
// at the root directory of this project.

import fs from "fs";
import path from "path";

const bundledAssetsPath = path.join("lite", "static", "bundledAssets");
const outputPath = path.join("lite", "static", "assets.json");

if (!fs.existsSync(bundledAssetsPath)) {
  console.error("Bundled assets directory not found: " + bundledAssetsPath);
  console.error("Run 'npm install' first to download assets.");
  process.exit(1);
}

let assetIndex = {};

let walkDir = (dir, root) => {
  let entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    if (entry.name.startsWith(".")) continue;
    let fullPath = path.join(dir, entry.name);
    let relPath = path.relative(root, fullPath);
    if (entry.isDirectory()) {
      walkDir(fullPath, root);
    } else {
      let contents = null;
      if (entry.name === "config.json") {
        try {
          contents = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
        } catch (e) {
          console.warn("Failed to parse config.json: " + fullPath);
        }
      }
      assetIndex[relPath] = contents;
    }
  }
};

walkDir(bundledAssetsPath, bundledAssetsPath);

fs.writeFileSync(outputPath, JSON.stringify(assetIndex, null, 2));
console.log("Generated asset index: " + outputPath + " (" + Object.keys(assetIndex).length + " entries)");
