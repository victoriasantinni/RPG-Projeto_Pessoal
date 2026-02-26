import express from "express";
import cors from "cors";
import health from "./src/routes/health.route.js";
import router from "./src/routes/personagem.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(router);



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});