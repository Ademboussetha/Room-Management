const app = require('./index');
const server = app.listen(8000, () => {
  console.log(`We are live on ${server.address().port}`);
});