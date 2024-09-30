let dolar = 5.1;
// Armazenar valores dos campos em variáveis
let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

// Listener para o input dos campos
usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl")
})
usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd")
})
brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value)
})



// Valor artificial no campo USD
usdInput.value = "0,00";
convert("usd-to-brl");

function formatCurrency(value) {
    // Variável utilizando a função de fixValue
    let fixedValue = fixValue(value);
    // Variável configurando o número
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    };
    // Variável utilizando a biblioteca local do Javascript
    let formatter = new Intl.NumberFormat("pt-BR", options);
    // Retorna a variável feita com o parâmetro de formatar o fixedValue
    return formatter.format(fixedValue);
}

// Função para corrigir o valor obtido no campo
function fixValue(value) {
    let fixedValue = value.replace(",", "."); // Altera "," para "."
    let floatValue = parseFloat(fixedValue); // Transforma a string para número
    // Undefined (letras/caractéres) = 0
    if (floatValue == NaN) { 
        floatValue = 0;
    };
    if (usdInput.value == "") { 
        floatValue = 0;
    };
    if (brlInput.value == "") { 
        floatValue = 0;
    };
    return floatValue; // Retorna o valor já corrigido
}

// Função para converter o valor entre as regiões
function convert(type) {
    if (type == "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value);
        let result = fixedValue * dolar;
        result = result.toFixed(2);

        brlInput.value = formatCurrency(result);
    };

    if (type == "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);
        let result = fixedValue / dolar;
        result = result.toFixed(2);

        usdInput.value = formatCurrency(result);
    };
}