import * as log from "npmlog";

// 自定义log样式
// log.heading = "dd-cli";
// log.headingStyle = { fg: "red", bg: "white" };
// log.addLevel("sucess", 2000, { fg: "yellow" });

export function changeLogLevel(level: "info" | "verbose") {
  (log.level as string) = level;
}

export { log };
