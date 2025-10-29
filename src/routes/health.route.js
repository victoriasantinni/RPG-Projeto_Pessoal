import { Router } from "express";

export const health = Router();

health.get("/health", (req, res) => {
    res.json({ meessage: "Servidor OK!" });
});

health.get("/health-melhor", (req, res) =>{
    res.json({ message:"Servidor OK!", data: new Date().toDateString});
})

health.get("/cadastro", (req, res) =>{
    res.json({ status: HEALTH });
});

export default health;