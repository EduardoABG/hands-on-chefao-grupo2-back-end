import App from "./infra/App";
import "dotenv/config";

const app = new App();

app.setup({ port: Number(process.env.PORT as string) });
