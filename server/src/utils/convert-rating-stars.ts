export function arrayParaObjeto(arr: string[]): Record<string, number> {
    const meuObjeto: Record<string, number> = {};
  
    arr.forEach((valor, indice) => {
      const chave = `star${indice + 1}`;
      meuObjeto[chave] = parseInt(valor);
    });
  
    return meuObjeto;
}

export function convertRatingStars(objeto: Record<string, number>): string {
    const valores = Object.values(objeto);
    const media = valores.reduce((soma, valor) => soma + valor, 0) / valores.length;
  
    let chaveMaisProxima: string | undefined;
    let diferencaMinima = Infinity;
  
    for (const chave in objeto) {
      //if(objeto[chave] == 0) continue;
      const diferenca = Math.abs(objeto[chave] - media);
  
      if (diferenca <= diferencaMinima) {
        diferencaMinima = diferenca;
        chaveMaisProxima = chave;
      }
    }
  
    return chaveMaisProxima!;
  }