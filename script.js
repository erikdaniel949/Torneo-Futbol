document.addEventListener('DOMContentLoaded', () => {
  const tablaPuntos = document.querySelector('.tabla-puntos');
  let miBD; // Si es const da error no me acuerdo porque :c
  // Selección de elementos del DOM
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const searchIcon = document.querySelector('.search-icon');
  const searchBar = document.querySelector('.search-bar');
  const checkbox = document.querySelector('.checkbox');
  const body = document.body;

  // Verificar si el modo oscuro está activado en el localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    checkbox.checked = true;
    body.classList.add('dark-mode');
  }

  // Alternar clase 'active' para mostrar/ocultar el menú al hacer clic en el botón hamburguesa
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });

  // Cambio de modo oscuro
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  // Cerrar el menú y la barra de búsqueda si se hace clic fuera de ellos
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('active');
    }
    if (!e.target.closest('.search-container') && !e.target.closest('.search-icon')) {
      searchBar.classList.remove('active');
    }
  });

  // Función para que al tocar un link interno no se guarde en el historial
  const noGuardarEnHistorial = (event) => {
    let target = event.target.getAttribute('href');
    window.history.replaceState(null, null, window.location.href.split('#')[0] + target);
  }; 

  // Funcion asíncrona para obtener el objeto principal de la api
  const obtenerDatosBD = async () => {
    // Intenta obtener el json de la API y almacenarlo en la vafiable "miAPI"
    try {
      const response = await fetch('miBD.json');
      if(!response.ok){
        throw new Error('Error al obtener la api');
      }
      miBD = await response.json();
    } catch (err) { // Si hay un error en el proceso muestra el error sin detener el programa
      console.log(err);
    }
  }

  
  
  // Función principal 
  const generarTablaDePuntosDinamicamente = async () => {
    await obtenerDatosBD(); // Espera a que se obtenga los datos del json para ejecutar el codigo
    
    // Ordenar los equipos por puntos, del mas alto al mas bajo
    const equiposOrdenados = miBD.equipos.sort((a, b) => b.puntos - a.puntos);
    
    const fragmento = document.createDocumentFragment(); // Crea un fragmento para cargar los datos a la pagina de una sola vez y no hacerlo uno por uno
    
    equiposOrdenados.forEach((equipo)=>{ // Repite el bloque de codigo con cada equipo
      let tablaItem = document.createElement('div'); // Crea un div
      tablaItem.classList.add('tabla-item');// Le agrega la clase 'tabla-item'
      
      
      // Nombre del equipo
      let campoNombre = document.createElement('div'); // Crea un div del campo del nombre del equipo
      campoNombre.classList.add('tabla-item-campo', 'campo-nombre'); // Le agrega las clases 'tabla-item-campo' y 'campo-nombre'
      let dataNombre = document.createElement('p'); // Crea un p, este va a contener la información del campo nombre
      dataNombre.textContent = `${equipo.nombre}`; // Le agrega el contenido dinámico al p, en este caso el nombre del equipo que este trabajando el forEach
      
      
      // Puntos del equipo
      let campoPuntos = document.createElement('div'); // Crea un div del campo de puntos del equipo
      campoPuntos.classList.add('tabla-item-campo', 'campo-puntos'); // Le agrega las clases 'tabla-item-campo' y 'campo-puntos'
      dataPuntos = document.createElement('p'); // Crea un p, este va a contener la información del campo de los puntos
      dataPuntos.textContent = `${equipo.puntos}`; // Le agrega el contenido dinámico al p, en este caso seria los puntos del equipo
      campoPuntos.appendChild(dataPuntos); // Le agrega los datos al campo
      campoNombre.appendChild(dataNombre); // Le agrega los datos al campo
      
      // Junta ambos campos en el item de la tabla
      tablaItem.appendChild(campoNombre);
      tablaItem.appendChild(campoPuntos);
      
      // Agrega cada item terminado al fragmento para cargarlos de una sola vez
      fragmento.appendChild(tablaItem);
    })
    // Carga los datos al HTML
    tablaPuntos.appendChild(fragmento);
  }
  
  // Llamada a la funcion principal
  generarTablaDePuntosDinamicamente()
});
