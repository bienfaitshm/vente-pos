import fs from "fs";
import path from "path";

const tasks: unknown[] = [];

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
);

console.log("✅ Tasks data generated.");
