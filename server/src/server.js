const { createApp } = require('./app');
const { connectDb } = require('./config/db');
const { env } = require('./config/env');

async function main() {
  await connectDb();
  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Round API listening on ${env.PORT}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
