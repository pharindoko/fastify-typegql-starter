"use strict";

import { build } from "./app";

export async function run() {
  const server = await build();
  console.log("listen to port 3000");
  server.listen(3000, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("listen to " + address);
  });
}
run().catch(console.error);
