import { createApp } from "./src/server/app.mjs";

const port = Number(process.env.PORT || 3000);
const app = createApp();

app.listen(port, () => {
  console.log(`AUTO BUILDER running at http://localhost:${port}`);
});

