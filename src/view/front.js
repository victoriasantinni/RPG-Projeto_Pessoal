const conteinerPersonagens = document.getElementById('personagens-lista');
const form = document.getElementById('form-personagem');

async function deletarPersonagem(id) {
    try {
        const resposta = await fetch(`http://localhost:3000/personagens/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            buscarPersonagens();
        }
    } catch (error) {
        console.error(error);
    }
}

async function buscarPersonagens() {
    try {
        const resposta = await fetch("http://localhost:3000/personagens");
        const personagens = await resposta.json();
        
        if (!conteinerPersonagens) return;
        conteinerPersonagens.innerHTML = "";

        personagens.forEach(p => {
            const imgUrl = p.classe === "Mago" 
                ? "https://cdn-icons-png.flaticon.com/512/3011/3011242.png" 
                : "https://cdn-icons-png.flaticon.com/512/3011/3011235.png";

            const card = document.createElement('div');
            card.className = 'card-personagem';
            card.innerHTML = `
                <img src="${imgUrl}" class="hero-icon" alt="${p.classe}">
                <div class="card-info">
                    <h3>${p.nome}</h3>
                    <p>Classe: ${p.classe} | Nível: ${p.nivel}</p>
                    <p>Atributos: 💪 ${p.forca || 0} | 🪄 ${p.mana || 0}</p>
                    <button onclick="deletarPersonagem(${p.id})">EXCLUIR HERÓI</button>
                </div>
            `;
            conteinerPersonagens.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nomeCampo = document.getElementById('nome');
        const classeCampo = document.getElementById('classe');
        const nivelCampo = document.getElementById('nivel');

        const novoPersonagem = {
            nome: nomeCampo.value,
            classe: classeCampo.value,
            nivel: Number(nivelCampo.value)
        };

        try {
            const resposta = await fetch('http://localhost:3000/personagens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoPersonagem)
            });

            if (resposta.ok) {
                form.reset();
                buscarPersonagens();
            }
        } catch (error) {
            console.error(error);
        }
    });
}

window.deletarPersonagem = deletarPersonagem;
buscarPersonagens();