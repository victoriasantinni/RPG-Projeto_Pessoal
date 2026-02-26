import fs from "node:fs/promises";

const CAMINHO_DB = "./src/database/personagens.json";

const lerBanco = async () => {
    try {
        const dados = await fs.readFile(CAMINHO_DB, "utf-8");
        return JSON.parse(dados);
    } catch {
        return [];
    }
};

const gravarBanco = async (lista) => {
    await fs.writeFile(CAMINHO_DB, JSON.stringify(lista, null, 2));
};

export const PersonagemController = {
    criar: async (req, res) => {
        const { nome, classe, nivel } = req.body;

        if (typeof nivel !== 'number' || nivel <= 0 || !nome) {
            return res.status(400).json({ erro: "Dados inválidos." });
        }

        const novoPersonagem = {
            id: Date.now(),
            nome,
            classe: classe.toLowerCase(),
            nivel,
            forca: classe.toLowerCase() === 'guerreiro' ? 10 : 0,
            mana: classe.toLowerCase() === 'mago' ? 10 : 0
        };

        try {
            const lista = await lerBanco();
            lista.push(novoPersonagem);
            await gravarBanco(lista);
            res.status(201).json(novoPersonagem);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao salvar." });
        }
    },

    listar: async (req, res) => {
        try {
            const { classe, nome } = req.query;
            let lista = await lerBanco();

            if (classe) lista = lista.filter(p => p.classe === classe.toLowerCase());
            if (nome) lista = lista.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));

            res.status(200).json(lista);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao listar." });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const lista = await lerBanco();
            const personagem = lista.find(p => p.id === Number(req.params.id));
            if (!personagem) return res.status(404).json({ erro: "Não encontrado." });
            res.status(200).json(personagem);
        } catch (error) {
            res.status(500).json({ erro: "Erro na busca." });
        }
    },

    atualizarNivel: async (req, res) => {
        try {
            const { id } = req.params;
            const { novoNivel } = req.body;
            const lista = await lerBanco();
            const personagem = lista.find(p => p.id === Number(id));

            if (!personagem) return res.status(404).json({ erro: "Não encontrado." });

            const diferenca = novoNivel - personagem.nivel;
            
            if (diferenca > 0) {
                if (personagem.classe === 'guerreiro') personagem.forca += diferenca * 10;
                if (personagem.classe === 'mago') personagem.mana += diferenca * 10;
            }

            personagem.nivel = novoNivel;
            await gravarBanco(lista);
            res.status(200).json(personagem);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao atualizar." });
        }
    },

    deletar: async (req, res) => {
        try {
            const lista = await lerBanco();
            const novaLista = lista.filter(p => p.id !== Number(req.params.id));
            
            if (lista.length === novaLista.length) return res.status(404).json({ erro: "Não encontrado." });

            await gravarBanco(novaLista);
            res.status(200).json({ mensagem: "Deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao deletar." });
        }
    }
};