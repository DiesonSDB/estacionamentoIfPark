//bloqueio de de acesso pelo console 15:43
(function () {
// trocando o querySelector por $
  const $ = q => document.querySelector(q)
//botão de regstro
$("#send").addEventListener("click", e => {
    const name = $("#name").value;
    const licence = $("#licence").value;

        console.log(name, licence);
    });
})();

