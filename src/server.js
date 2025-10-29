import express from "express";
import health from "./routes/health.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", health);



app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});