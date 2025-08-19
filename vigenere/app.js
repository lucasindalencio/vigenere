function codificar() {
    let texto = document.getElementById("texto").value; 
    // pega o valor que o usuário digitou no campo "texto"
    
    let chave = document.getElementById("chave").value; 
    // pega o valor digitado no campo "chave" (a palavra-chave usada na cifra)
    
    let resultado = vigenere(texto, chave, true); 
    // chama a função vigenere() passando:
    // - o texto digitado
    // - a chave
    // - "true" indicando que queremos codificar
    
    document.getElementById("resultado").value = resultado; 
    // coloca o resultado da codificação no campo de saída
}

function decodificar() {
    let texto = document.getElementById("resultado").value; 
    // pega o texto já codificado (do campo "resultado")
    
    let chave = document.getElementById("chave").value; 
    // pega a chave digitada
    
    let resultado = vigenere(texto, chave, false); 
    // chama a função vigenere(), mas agora com "false"
    // ou seja, em vez de somar os deslocamentos, vai subtrair (decodificação)
    
    document.getElementById("resultadoDecodificado").value = resultado; 
    // mostra o texto decifrado no campo "resultadoDecodificado"
}

function vigenere(texto, chave, codificar = true) {
    let resultado = ""; 
    // variável onde o texto final (codificado ou decodificado) vai ser montado
    
    let alfabeto = "abcdefghijklmnopqrstuvwxyz"; 
    // define o alfabeto que vamos usar (apenas letras minúsculas)
    
    let b = 0; 
    // contador que percorre a chave (vai se repetir várias vezes se o texto for maior que a chave)
    
    for (let a = 0; a < texto.length; a++) {
        // percorre cada caractere do texto (a = índice do texto)
        
        let letra = texto[a]; 
        // pega a letra atual do texto
        
        if (alfabeto.includes(letra)) {
            // verifica se a letra está no alfabeto (ignora espaços, números, pontuação)
            
            let posTexto = alfabeto.indexOf(letra); 
            // posição da letra do texto no alfabeto (0 a 25)
            
            let posChave = alfabeto.indexOf(chave[a % chave.length]); 
            // posição da letra correspondente da chave no alfabeto
            // "j % chave.length" faz a chave recomeçar quando o texto é maior que ela
            
            let novaPos; 
            // aqui vamos calcular a nova posição da letra
            
            if (codificar) {
                novaPos = (posTexto + posChave) % 26; 
                // codificação = soma posição do texto + posição da chave
                // "% 26" garante que não passe do alfabeto (26 letras)
            } else {
                novaPos = (posTexto - posChave + 26) % 26; 
                // decodificação = subtrai posição da chave da posição do texto
                // "+ 26" garante que o resultado nunca fique negativo
            }
            
            resultado += alfabeto[novaPos]; 
            // adiciona a nova letra (já codificada/decodificada) ao resultado
            
            b++; 
            // avança o índice da chave (só avança se realmente codificou uma letra)
        } else {
            resultado += letra; 
            // se não for letra (ex: espaço, vírgula, número), mantém como está
        }
    }
    return resultado; 
    // devolve o texto final (já transformado)
}
