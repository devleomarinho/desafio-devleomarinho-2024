class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'macaco', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'gazela', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'leao', quantidade: 1 }] }
      ];
  
      this.animaisValidos = {
        'leao': { tamanho: 3, biomas: ['savana'], carnivoro: true },
        'leopardo': { tamanho: 2, biomas: ['savana'], carnivoro: true },
        'crocodilo': { tamanho: 3, biomas: ['rio'], carnivoro: true },
        'macaco': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        'gazela': { tamanho: 2, biomas: ['savana'], carnivoro: false },
        'hipopotamo': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
        let resultado = { erro: null, recintosViaveis: [] };

    
        if (!this.animaisValidos[animal.toLowerCase()]) {
          resultado.erro = "Animal inválido";
          return resultado;
        }
    
        if (isNaN(quantidade) || quantidade <= 0) {
          resultado.erro = "Quantidade inválida";
          return resultado;
        }
      const animalInfo = this.animaisValidos[animal.toLowerCase()];
      const tamanhoNecessario = quantidade * animalInfo.tamanho;
  
      let recintosViaveis = [];
      
  
      for (let recinto of this.recintos) {
        let espacoOcupado = this.calcularEspaco(recinto);
        let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
  
        if (this.biomaAdequado(animalInfo, recinto) && espacoLivre >= tamanhoNecessario) {
          if (this.carnivorosJuntos(animalInfo, recinto) && this.macacosJuntos(animalInfo, recinto)) {
            let novoEspacoLivre = espacoLivre - tamanhoNecessario;
            recintosViaveis.push({
              numero: recinto.numero,
              espacoLivre:novoEspacoLivre,
              espacoTotal: recinto.tamanhoTotal
            });
          }
        }
      }
      
      if (recintosViaveis.length === 0) {
        resultado.erro = "Não há recinto viável";
    } else {
        
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        resultado.recintosViaveis = recintosViaveis.map(
            r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`
        );
    }
    return resultado;
    }
  
    calcularEspaco(recinto) {
      let espacoOcupado = 0;
      for (let animal of recinto.animais) {
        espacoOcupado += animal.quantidade * this.animaisValidos[animal.especie.toLowerCase()].tamanho;
      }
      if (recinto.animais.length > 1) {
        espacoOcupado += 1;  
      }
      return espacoOcupado;
    }
  
    biomaAdequado(animalInfo, recinto) {
        const biomaDireto = animalInfo.biomas.includes(recinto.bioma);
         if (biomaDireto) {
            return true;
        }
        
      }
    
  
    carnivorosJuntos(animalInfo, recinto) {
      if (!animalInfo.carnivoro) {
        return true;
      }
      for (let animal of recinto.animais) {
        if (animal.especie.toLowerCase() !== animalInfo.especie && this.animaisValidos[animal.especie.toLowerCase()].carnivoro) {
          return false;
        }
      }
      return true;
    }
  
    macacosJuntos(animalInfo, recinto) {
      if (animalInfo.especie === 'macaco') {
        if (recinto.animais.length === 0) {
          return false;
        }
        for (let animal of recinto.animais) {
          if (this.animaisValidos[animal.especie.toLowerCase()].carnivoro) {
            return false; 
          }
        }
      }
      return true;
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  