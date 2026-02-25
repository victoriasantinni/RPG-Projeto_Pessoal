import { Guerreiro, Mago } from "../model/personagem.model.js";   
import fs from "node:fs/promises";

export const PersonagemController = {
    criar: async (req, res) => {
        const { nome, classe, nivel, atributoEspecial } = req.body;
        let novoPersonagem;

        switch (classe.toLowerCase()) {
            case 'guerreiro': novoPersonagem = new Guerreiro(nome, nivel, atributoEspecial); break;
            case 'mago': novoPersonagem = new Mago(nome, nivel, atributoEspecial); break;
            default: return res.status(400).json({ erro: "Classe inválida" });
        }

        try {
            const dadosCadastrados = await fs.readFile("./src/database/personagens.json", "utf-8");
            const listaPersonagens = JSON.parse(dadosCadastrados);

            listaPersonagens.push(novoPersonagem);

            const listaEmTexto = JSON.stringify(listaPersonagens, null, 2);
            await fs.writeFile("./src/database/personagens.json", listaEmTexto);

            res.status(201).json(novoPersonagem); 
        } catch (error) {
            res.status(500).json({ error: "Erro interno ao salvar a ficha" });
        }
    },

    lista: async (req, res) => {
        try {
            const { classe, nome } = req.query; 

            const dadosBrutos = await fs.readFile("./src/database/personagens.json", "utf-8");
            const listaPersonagens = JSON.parse(dadosBrutos);
            
            let resultado = listaPersonagens;
            
            if (classe) {
                resultado = resultado.filter(p => p.classe.toLowerCase() === classe.toLowerCase());
            }

            if (nome) {
                resultado = resultado.filter(p => 
                    p.nome.toLowerCase().includes(nome.toLowerCase())
                );
            }
        
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar os personagens" });
        }   
    },

    atualizarNivel: async (req, res) => {
        try {
            const { nome } = req.params;    
            const { novoNivel } = req.body;

            const dados = await fs.readFile("./src/database/personagens.json", "utf-8");
            let lista = JSON.parse(dados);

            const personagem = lista.find(p => p.nome.toLowerCase() === nome.toLowerCase());
            
            if (!personagem) {
                return res.status(404).json({ error: "Personagem não encontrado" });
            }

            personagem.nivel = novoNivel;
            await fs.writeFile("./src/database/personagens.json", JSON.stringify(lista, null, 2));

            res.status(200).json({ message: "Nível atualizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar o nível" });
        }
    },

    deletar: async (req, res) => {
        try {
            const { nome } = req.params;

            const dados = await fs.readFile("./src/database/personagens.json", "utf-8");
            let lista = JSON.parse(dados);

            const listaAtualizada = lista.filter(p => p.nome.toLowerCase() !== nome.toLowerCase());

            if (lista.length === listaAtualizada.length) {
                return res.status(404).json({ error: "Personagem não encontrado" });
            }

            await fs.writeFile("./src/database/personagens.json", JSON.stringify(listaAtualizada, null, 2));

            res.status(200).json({ message: `O personagem ${nome} foi deletado com sucesso!` });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar o personagem" });
        }
    }
}