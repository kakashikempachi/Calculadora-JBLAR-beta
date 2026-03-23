const campos = ['b4', 'b5', 'c3', 'd3', 'd6'];

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularDiferencaMeses(dataInicio, dataFim) {
    if (!dataInicio || !dataFim) return 0;
    const d1 = new Date(dataInicio + 'T00:00:00');
    const d2 = new Date(dataFim + 'T00:00:00');
    let meses = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
    if (d2.getDate() < d1.getDate()) meses--;
    return meses < 0 ? 0 : meses;
}

function calcular() {
    const saldoDevedor = parseFloat(document.getElementById('b4').value) || 0;
    const porcAto = (parseFloat(document.getElementById('b5').value) || 0) / 100;
    const qtdParcelas = parseInt(document.getElementById('d6').value) || 1;
    
    // B6 = B4 * B5
    const valorAto = saldoDevedor * porcAto;
    // C6 = B4 - B6
    const saldoRemanescente = saldoDevedor - valorAto;
    // E6 = C6 / D6
    const valorParcela = saldoRemanescente / qtdParcelas;
    // E3 = Meses entre datas
    const mesesHabitese = calcularDiferencaMeses(document.getElementById('c3').value, document.getElementById('d3').value);

    // Atualiza Tela
    document.getElementById('b6').value = formatarMoeda(valorAto);
    document.getElementById('c6').value = formatarMoeda(saldoRemanescente);
    document.getElementById('e6').value = formatarMoeda(valorParcela);
    document.getElementById('e3').value = mesesHabitese + " meses";

    // Gera Macro
    const macro = `Conforme alinhamos até o momento, estas são as condições do seu acordo:

Saldo Devedor total: ${formatarMoeda(saldoDevedor)}
Pagamento de ATO: ${formatarMoeda(valorAto)} correspondente a ${(porcAto * 100).toFixed(0)}% do seu saldo devedor.

Parcelado em ${qtdParcelas} vezes com o valor de ${formatarMoeda(valorParcela)} por parcela.

Gostaria de lembrar que o não pagamento do boleto do ATO acarretará na continuidade da inadimplência.`;
    
    document.getElementById('macro-text').value = macro;
}

function copiarTexto() {
    const texto = document.getElementById('macro-text');
    texto.select();
    texto.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(texto.value);
    alert("Copiado!");
}

// Escutar mudanças em todos os campos manuais
campos.forEach(id => document.getElementById(id).addEventListener('input', calcular));
document.getElementById('c3').addEventListener('change', calcular);
document.getElementById('d3').addEventListener('change', calcular);
