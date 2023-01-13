//bloqueio de de acesso pelo console  28:55
(function () {
// trocando o querySelector por $
  const $ = q => document.querySelector(q)
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
})();

