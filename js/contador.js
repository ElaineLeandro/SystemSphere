// Defina a duração do contador (por exemplo, 1 dia)
let countDownDuration = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

// Defina a data e hora de início
let countDownStart = Date.now();

// Atualize o contador a cada 1 segundo
let x = setInterval(function () {

  // Obtenha a data e hora atual
  let now = Date.now();

  // Encontre a distância entre agora e a data de término
  let distance = countDownDuration - (now - countDownStart);

  // Cálculos de tempo para dias, horas, minutos e segundos
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Exiba o resultado nos elementos correspondentes
  document.querySelector('.days').innerHTML = days;
  document.querySelector('.hours').innerHTML = hours;
  document.querySelector('.minutes').innerHTML = minutes;
  document.querySelector('.seconds').innerHTML = seconds;

  // Se o contador terminou, reinicie o contador
  if (distance < 0) {
    countDownStart = Date.now();
  }
}, 1000);