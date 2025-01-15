// Elementos del DOM
const resultDiv = document.getElementById('result');
const savedDiv = document.getElementById('saved-combinations');
const lotterySelect = document.getElementById('lottery-select');
const resultsContainer = document.getElementById("results-container"); // Contenedor de resultados de la API

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

const calendarioLoterias = {
  lunes: ["ANTIOQUEÑITA MAÑANA", "BOYACA", "CHONTICO DIA", "SINUANO DIA", "DORADO MAÑANA", "CARIBEÑA DIA", "MOTILON DIA", "PAISITA DIA"],
  martes: ["ANTIOQUEÑITA TARDE", "CAUCA", "CRUZ ROJA", "PAISITA DIA", "DORADO TARDE", "CARIBEÑA NOCHE", "MOTILON NOCHE", "SINUANO NOCHE"],
  miercoles: ["ASTRO LUNA", "CUNDINAMARCA", "HUILA", "SINUANO NOCHE", "CHONTICO NOCHE", "LA FANTASTICA DIA", "CULONA DIA"],
  jueves: ["ASTRO SOL", "DORADO MAÑANA", "LA FANTASTICA DIA", "TOLIMA", "ANTIOQUEÑITA MAÑANA", "CAFETERO DIA"],
  viernes: ["BOGOTA", "CAFETERITO DIA", "CULONA DIA", "VALLE", "ANTIOQUEÑITA TARDE", "CHONTICO DIA"],
  sabado: ["CHONTICO NOCHE", "DORADO TARDE", "MOTILON DIA", "RISARALDA", "CARIBEÑA DIA", "PAISITA NOCHE", "SINUANO DIA"],
  domingo: ["CARIBEÑA DIA", "CULONA NOCHE", "PAISITA NOCHE", "SANTANDER", "DORADO NOCHE", "LA FANTASTICA NOCHE", "MOTILON NOCHE"],
};

function actualizarLoteriasDelDia() {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase(); // Obtiene el día en minúsculas para comparar
  const loteriasDelDia = calendarioLoterias[dayOfWeek];

  lotterySelect.innerHTML = '<option value="">-- Selecciona una lotería --</option>';
  lotterySelect.disabled = !loteriasDelDia; // Deshabilita si no hay loterías

  if (loteriasDelDia) {
      loteriasDelDia.forEach(loteria => {
          const option = document.createElement('option');
          option.value = loteria;
          option.text = loteria;
          lotterySelect.appendChild(option);
      });
  } else {
      const option = document.createElement('option');
      option.value = "";
      option.text = "No hay loterías programadas para hoy.";
      lotterySelect.appendChild(option);
  }
} 

window.addEventListener('load', actualizarLoteriasDelDia);

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




// Función para obtener y mostrar resultados de la API (NUEVO)
async function mostrarResultadosAPI(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (data && data.status === "success" && Array.isArray(data.data)) {
          resultsContainer.innerHTML = ''; // Limpia resultados anteriores
          data.data.forEach(result => {
              const resultItem = document.createElement("div");
              resultItem.classList.add("result-item");
              resultItem.innerHTML = `
                  <h3>${result.lottery}</h3>
                  <p>Fecha: ${result.date}</p>
                  <p>Resultado: ${result.result}</p>
                  <p>Serie: ${result.series || 'N/A'}</p>
              `;
              resultsContainer.appendChild(resultItem);
          });
      } else {
          console.error("Formato de respuesta de la API incorrecto:", data);
          resultsContainer.innerHTML = '<p>Error al cargar los resultados.</p>';
      }

  } catch (error) {
      console.error("Error al obtener resultados de la API:", error);
      resultsContainer.innerHTML = '<p>Error al cargar los resultados.</p>';
  }
}

// Llamar a la función para obtener y mostrar resultados (NUEVO)
const apiUrl = 'https://api-resultadosloterias.com/api/results/2023-02-01'; // Reemplaza con la URL real
mostrarResultadosAPI(apiUrl);