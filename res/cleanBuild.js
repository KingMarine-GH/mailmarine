import fs from "fs";
import child_process from "child_process";

fs.rmSync("@root/build", { recursive: true, force: true });
child_process.execSync(`cd res\n./build.sh\n`);