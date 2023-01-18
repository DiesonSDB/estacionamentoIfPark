//bloqueio de de acesso pelo console
(function () {
// trocando o querySelector por $
  const $ = q => document.querySelector(q)

  function convertPeriod(mil) {
    var min = Math.floor(mil / 60000);
    var sec = Math.floor((mil % 60000) / 1000);
    return `${min}m e ${sec}s`;
};

function renderGarage () {
    const garage = getGarage();
    $("#garage").innerHTML = "";
    garage.forEach(c => addCarToGarage(c))
};
  
//armazenar e apagar carro
  function addCarToGarage (car) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${car.name}</td>
        <td>${car.licence}</td>
        <td data-time="${car.time}">
            ${new Date(car.time)
                    .toLocaleString('pt-BR', { 
                        hour: 'numeric', minute: 'numeric' 
            })}
        </td>
        <td>
            <button class="delete">x</button>
        </td>
    `;

    $("#garage").appendChild(row);
};

//evento de chegar as info do local storage
   function checkOut(info) {
        let period = new Date() - new Date(info[2].dataset.time);
        period = convertPeriod(period);

        const licence = info[1].textContent;
        const msg = `O veículo ${info[0].textContent} de placa ${licence} permaneceu ${period} estacionado. \n\n Deseja encerrar?`;

        if(!confirm(msg)) return;
        
        const garage = getGarage().filter(c => c.licence !== licence);
        localStorage.garage = JSON.stringify(garage);
        
        renderGarage();
    };

    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

    renderGarage();



//botão de regstro
$("#send").addEventListener("click", e => {
    const name = $("#name").value;
    const licence = $("#licence").value;

    if(!name || !licence){
      alert("Os campos são obrigatórios.");
      return;
  }  
//função de add dado do carro na garagem
    const car = { name: name, licence: licence, time: new Date()}

    const garage = localStorage.garage ? JSON.parse(localStorage.garage) : [] ;
    garage.push(car);

    localStorage.garage = JSON.stringify(garage);

    console.log(garage);

    addCarToGarage(car);
//limpar os dados passados e deixar os novos
    $("#name").value = "";
    $("#licence").value = "";
    });
//evento de deletar carro
    $("#garage").addEventListener("click", (e) => {
        if(e.target.className === "delete")
            checkOut(e.target.parentElement.parentElement.cells);
    });
})();

