// Elementos del DOM
const resultDiv = document.getElementById('result');
const savedDiv = document.getElementById('saved-combinations');
const lotterySelect = document.getElementById('lottery-select');

// listas para cada loteria 
const loterias = {
  "ANTIOQUEÑITA MAÑANA": [],
  "ANTIOQUEÑITA TARDE": [],
  "ASTRO LUNA": [],
  "ASTRO SOL": [],
  "BOGOTA": [],
  "BOYACA": [],
  "CAFETERITO DIA": [],
  "CAFETERITO NOCHE": [],
  "CARIBEÑA DIA": [],
  "CARIBEÑA NOCHE": [],
  "CAUCA": [],
  "CHONTICO": [],
  "CHONTICO NOCHE": [],
  "CRUZ ROJA": [],
  "CULONA": [],
  "CULONA NOCHE": [],
  "CUNDINAMARCA": [],
  "DORADO MAÑANA": [],
  "DORADO TARDE": [],
  "HUILA": [],
  "LA FANTASTICA DIA": [],
  "LA FANTASTICA NOCHE": [],
  "MANIZALES": [],
  "MEDELLIN": [],
  "META": [],
  "MOTILON DIA": [],
  "MOTILON NOCHE": [],
  "PAISITA DIA": [],
  "PAISITA NOCHE": [],
  "PIJAO": [],
  "QUINDIO": [],
  "RISARALDA": [],
  "SAMAN": [],
  "SANTANDER": [],
  "SINUANO DIA": [],
  "SINUANO NOCHE": [],
  "TOLIMA": [],
  "VALLE": []
};


// Array de signos zodiacales
const zodiacSigns = [
  'Acuario', 'Aries', 'Cáncer', 'Capricornio', 
  'Escorpio', 'Géminis', 'Leo', 'Libra', 
  'Piscis', 'Sagitario', 'Tauro', 'Virgo',
  'Todos'
];

// Función para cargar combinaciones guardadas (MODIFICADA)
const loadSavedCombinations = () => {
  let savedDisplay = "";
  for (const lottery in loterias) {
      if (loterias[lottery].length > 0) {
          savedDisplay += `${lottery}: ${loterias[lottery].map(details => `${details.number} ${details.sign ? `(${details.sign})` : ''}`).join(' - ')}<br>`; // Usar <br> para saltos de línea
      }
  }
  savedDiv.innerHTML = savedDisplay || 'No hay combinaciones guardadas.'; // Usar innerHTML para interpretar <br>
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

// Generar número para una lotería específica (MODIFICADO)
document.getElementById('generate-for-lottery').addEventListener('click', () => {
  const selectedLottery = lotterySelect.value;

  if (!selectedLottery) {
      resultDiv.textContent = 'Por favor, selecciona una lotería.';
      return;
  }

  // Generar un nuevo número (YA NO SE DETIENE SI YA EXISTE UNO)
  let newNumber;
  let sign = null;
  let isDuplicate;

  do {
      newNumber = generateCombination();
      isDuplicate = loterias[selectedLottery].some(item => item.number === newNumber);
  } while (isDuplicate); // Repite hasta que se genere un número no duplicado

  // Verificar si es ASTRO SOL o ASTRO LUNA para añadir signo zodiacal
  if (selectedLottery === 'ASTRO SOL' || selectedLottery === 'ASTRO LUNA') {
      const randomIndex = Math.floor(Math.random() * zodiacSigns.length);
      sign = zodiacSigns[randomIndex];
  }

  // Guardar detalles en el ARRAY correspondiente DENTRO del objeto loterias
  loterias[selectedLottery].push({ number: newNumber, sign });

  // Mostrar resultado (AHORA MUESTRA TODOS LOS NÚMEROS GENERADOS)
  let numerosGenerados = loterias[selectedLottery].map(item => `${item.number} ${item.sign ? `(${item.sign})` : ''}`).join(' - ');
  resultDiv.textContent = `Números generados para ${selectedLottery}: ${numerosGenerados}`;

  loadSavedCombinations();
});

// Limpiar resultados y almacenamiento local (MODIFICADO)
document.getElementById('clear').addEventListener('click', () => {
  for (const lottery in loterias) {
      loterias[lottery] = []; // Vacía el array de cada lotería
  }
  resultDiv.textContent = '';
  loadSavedCombinations();
  localStorage.removeItem('lotteryCombinations'); // Limpia localStorage
});

// Cargar combinaciones guardadas al iniciar (MODIFICADO)
const storedCombinations = JSON.parse(localStorage.getItem('lotteryCombinations')) || {};
for (const lottery in storedCombinations) {
    loterias[lottery] = storedCombinations[lottery];
}
loadSavedCombinations();


// Guardar loterias en localStorage antes de cerrar/recargar (NUEVO)
window.addEventListener('beforeunload', () => {
  localStorage.setItem('lotteryCombinations', JSON.stringify(loterias));
});