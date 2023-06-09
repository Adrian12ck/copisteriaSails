

let black = 1.5;
let yellow = 1.5;
let magenta = 1.5;
let cyan = 1.5;


function limpiar(id) {
    const impresora = document.getElementById(id);
    const lista = impresora.querySelector('.list-group');
    const elementos = [];
    const lista2 = JSON.parse(sessionStorage.getItem(id)) || [];
  
   
    for (let i = 0; i < lista2.length; i++) {
      const elemento = document.createElement('li');
      elemento.textContent = lista2[i];
      elementos.push(elemento);
    }
    lista.innerHTML = '';
    elementos.forEach(item => lista.appendChild(item));
  }
  

  function ajustarValores(elemento, data, black, yellow, magenta, cyan) {
  
    let totalLength = elemento.length;
    let negroColor2 = data.negro - 2;
    let amarilloColor2 = data.amarillo - 2;
    let magnetaColor2 = data.rosa - 2;
    let cianColor2 = data.azul - 2;
  
    function comprobarValores(colorObj) {
        return Object.values(colorObj).every(color => color >= 0);
      }
      
      let colores = {
        negro: negroColor2,
        amarillo: amarilloColor2,
        rosa: magnetaColor2,
        azul: cianColor2
      };
      
      let valoresPositivos = comprobarValores(colores);
      
      
    if (valoresPositivos) {
      return colores;
    } else {
      return false
    }
    function calcular(original, color , length) {
      return original - (color * length);
    }
    
    function comprobarImpresion(colorValues) {
      return colorValues.negro >= 0 && colorValues.amarillo >= 0 && colorValues.rosa >= 0 && colorValues.azul >= 0;
    }
  
    const usoColores = {
      negro: black,
      amarillo: yellow,
      rosa: magenta,
      azul: cyan
    };
  
    const coloresUpdate = {
      negro: calcular(data.negro, usoColores.negro, totalLength),
      amarillo: calcular(data.amarillo, usoColores.amarillo, totalLength),
      rosa: calcular(data.rosa, usoColores.rosa, totalLength),
      azul: calcular(data.azul, usoColores.azul, totalLength)
    };
  
    if (comprobarImpresion(coloresUpdate)) {
      return {
        negro: coloresUpdate.negro,
        amarillo: coloresUpdate.amarillo,
        rosa: coloresUpdate.rosa,
        azul: coloresUpdate.azul
      };
    } else {
      return false;
    }
  }
  

  async function getPrinters() {
    try {
      const response = await fetch('/impresoras');
      if (!response.ok) {
        throw new Error('error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error :', error);
      return null;
    }
  }
  




  function rellenarColores(impresora, data) {
    let container = document.getElementById(impresora);
    console.log(container)
    container.querySelector('.negro').innerHTML = data.negro + "%";
    container.querySelector('.amarillo').innerHTML = data.amarillo + "%";
    container.querySelector('.azul').innerHTML = data.azul + "%";
    container.querySelector('.rosa').innerHTML = data.rosa + "%";
  }