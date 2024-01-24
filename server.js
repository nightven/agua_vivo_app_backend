const app = require("./app");
const dbConnect = require("./db/connect");
const { PORT } = process.env;

async function startServer() {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.log(error.message);
  }
}

startServer();
