export class Personagem {
    #Nome;
    #classe;
    #nivel;
    #Vida;
    #vidaMáxima;
    constructor(nome, classe, nivel) {
        this.nome = nome;
        this.classe = classe;
        this.nivel = nivel; 
        this.vidaMáxima = level * 10;   
        this.vida = this.vidaMáxima;
        this.inventário = [];
    }

    get vida() {
        return this.#Vida;
    }

    receberDano(valorDano) {
        this.#Vida = Math.max(0, this.#Vida - valorDano);
        console.log(`${this.nome} recebeu ${valorDano} de dano. Vida atual: ${this.vida}/${this.vidaMáxima}`);
    }

    curar(valorCura) {
        this.#Vida = Math.min(this.vidaMáxima, this.#Vida + valorCura);
        console.log(`${this.nome} foi curado em ${valorCura}. Vida atual: ${this.vida}/${this.vidaMáxima}`);
    }   
}


export class Guerreiro extends Personagem {
    constructor(nome, nivel, forca) {
        super(nome, 'Guerreiro', nivel);
        this.forca = forca;
    }    
    usarHabilidade() {
        console.log(`${this.nome} usa "Fúria de Batalha" com ${this.forca} de força!`);
    }
}

export class Mago extends Personagem {
    constructor(nome, nivel, mana) {
        super(nome, 'Mago', nivel);
        this.mana = mana;
    }
    usarHabilidade() {
        console.log(`${this.nome} conjura "Bola de Fogo" usando ${this.mana} de mana!`);
    }
}