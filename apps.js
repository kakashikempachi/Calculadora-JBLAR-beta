// Novos elementos de data
const inputDataInicial = document.getElementById('c3');
const inputDataHabitese = document.getElementById('d3');
const outputMesesHabitese = document.getElementById('e3');

// Função para simular o DATADIF(M) do Excel
function calcularDiferencaMeses(dataInicio, dataFim) {
    if (!dataInicio || !dataFim) return 0;
    
    const d1 = new Date(dataInicio);
    const d2 = new Date(dataFim);
    
    let meses = (d2.getFullYear() - d1.getFullYear()) * 12;
    meses -= d1.getMonth();
    meses += d2.getMonth();
    
    // Ajuste para não contar o mês se o dia de fim for menor que o dia de início
    if (d2.getDate() < d1.getDate()) {
        meses--;
    }
    
    return meses <= 0 ? 0 : meses;
}

// Dentro da sua função calcular(), adicione:
function calcular() {
    // ... (mantenha os cálculos anteriores de saldo e ato)

    // Cálculo das Datas (E3)
    const meses = calcularDiferencaMeses(inputDataInicial.value, inputDataHabitese.value);
    outputMesesHabitese.value = meses + " meses";
}

// Adicione os ouvintes para as datas
inputDataInicial.addEventListener('change', calcular);
inputDataHabitese.addEventListener('change', calcular);