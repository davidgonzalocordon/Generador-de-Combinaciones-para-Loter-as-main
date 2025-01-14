// Elementos del DOM
const resultDiv = document.getElementById('result');
const savedDiv = document.getElementById('saved-combinations');
const lotterySelect = document.getElementById('lottery-select');

// Array de signos zodiacales
const zodiacSigns = [
  'Acuario', 'Aries', 'Cáncer', 'Capricornio', 
  'Escorpio', 'Géminis', 'Leo', 'Libra', 
  'Piscis', 'Sagitario', 'Tauro', 'Virgo',
  'Todos'
];

// Función para cargar combinaciones guardadas
const loadSavedCombinations = () => {
  const saved = JSON.parse(localStorage.getItem('lotteryCombinations')) || {};
  const savedDisplay = Object.entries(saved)
    .map(([lottery, details]) => `${lottery}: ${details.number} ${details.sign ? `(${details.sign})` : ''}`)
    .join(' - ');
  savedDiv.textContent = savedDisplay || 'No hay combinaciones guardadas.';
};

// Función para generar un número único de 4 dígitos
const generateCombination = () => {
  const digits = [];
  while (digits.length < 4) {
    const randomDigit = Math.floor(Math.random() * 10); // Número entre 0 y 9
    if (!digits.includes(randomDigit)) {
      digits.push(randomDigit);
    }
  }
  return digits.join('');
};

// Generar número para una lotería específica
document.getElementById('generate-for-lottery').addEventListener('click', () => {
  const selectedLottery = lotterySelect.value;

  if (!selectedLottery) {
    resultDiv.textContent = 'Por favor, selecciona una lotería.';
    return;
  }

  const saved = JSON.parse(localStorage.getItem('lotteryCombinations')) || {};
  if (saved[selectedLottery]) {
    const details = saved[selectedLottery];
    resultDiv.textContent = `El número ya generado para ${selectedLottery} es: ${details.number} ${details.sign ? `(${details.sign})` : ''}`;
    return;
  }

  // Generar un nuevo número
  const newNumber = generateCombination();
  let sign = null;

  // Verificar si es ASTRO SOL o ASTRO LUNA para añadir signo zodiacal
  if (selectedLottery === 'ASTRO SOL' || selectedLottery === 'ASTRO LUNA') {
    const randomIndex = Math.floor(Math.random() * zodiacSigns.length);
    sign = zodiacSigns[randomIndex];
  }

  // Guardar detalles en localStorage
  saved[selectedLottery] = { number: newNumber, sign };
  localStorage.setItem('lotteryCombinations', JSON.stringify(saved));

  // Mostrar resultado
  resultDiv.textContent = `Número generado para ${selectedLottery}: ${newNumber} ${sign ? `(${sign})` : ''}`;
  loadSavedCombinations();
});

// Limpiar resultados y almacenamiento local
document.getElementById('clear').addEventListener('click', () => {
  localStorage.removeItem('lotteryCombinations');
  resultDiv.textContent = '';
  loadSavedCombinations();
});

// Cargar combinaciones guardadas al iniciar
loadSavedCombinations();
