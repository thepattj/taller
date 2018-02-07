function navegar(liga){
    window.location.assign(liga + '.html');
}

function guardarPersonales(){
    //CAPTURAMOS LOS VALORES EN VARIABLES
    n = document.getElementById('n').value;
    c = document.getElementById('c').value;
    f = document.getElementById('f').value;
    p = document.getElementById('p').value;
    e = document.getElementById('e').value;
    
    //ALMACENAMOS LOS VALORES EN LOCALSTORAGE
    localStorage.setItem('nombre',n);
    localStorage.setItem('correo',c);
    localStorage.setItem('fecha',f);
    localStorage.setItem('peso',p);
    localStorage.setItem('estatura',e);
    
    verAlerta('Listo!','Tus datos fueron guardados exitosamente.')
}

function cargarPersonales(){
    //CARGAMOS LOS DATOS GUARDADOS EN LOCALSTORAGE
    n = localStorage.getItem('nombre');
    c = localStorage.getItem('correo');
    f = localStorage.getItem('fecha');
    p = localStorage.getItem('peso');
    e = localStorage.getItem('estatura');
    
    //LOS IMPRIMIMOS EN LOS ELEMENTOS
    document.getElementById('n').value = n;
    document.getElementById('c').value = c;
    document.getElementById('f').value = f;
    document.getElementById('p').value = p;
    document.getElementById('e').value = e; 
}

function verAlerta(titulo,contenido){
    document.getElementById('alerta-titulo').innerHTML = titulo;
    document.getElementById('alerta-mensaje').innerHTML = contenido;
    document.querySelector('.alerta').classList.add('ver');
    setTimeout(function(){
        document.querySelector('.alerta').classList.remove('ver')
    },3000);
}

function verAgregarComida(){
    document.querySelector('.agregar-comida').classList.add('ver-agregar-comida')
}

function guardarComida(){
    //CAPTURAR LAS VARIABLES
    tipoComida = document.getElementById('tipo-comida').value;
    nombreComida = document.getElementById('nuevo-nombre').value;
    caloriasComida = document.getElementById('nuevo-calorias').value;
    //CONTADOR DE COMIDA
    //SI YA EXISTE EL CONTADOR, ACTUALIZARLO, SI NO, CREARLO
    if(localStorage.getItem('contadorComidas')){
        contadorComidas = localStorage.getItem('contadorComidas');
        localStorage.setItem('tipo'+contadorComidas, tipoComida);
        localStorage.setItem('nombre'+contadorComidas, nombreComida);
        localStorage.setItem('calorias'+contadorComidas, caloriasComida);
        contadorComidas++;
        localStorage.setItem('contadorComidas', contadorComidas);
    }else{
        contadorComidas = 0;
        localStorage.setItem('tipo'+contadorComidas, tipoComida);
        localStorage.setItem('nombre'+contadorComidas, nombreComida);
        localStorage.setItem('calorias'+contadorComidas, caloriasComida);
        contadorComidas++;
        localStorage.setItem('contadorComidas', contadorComidas);
    }
    //VACIAR LOS CAMPOS Y OCULTARLOS
    document.querySelector('.agregar-comida').classList.remove('ver-agregar-comida');
    document.getElementById('tipo-comida').value = "";
    document.getElementById('nuevo-nombre').value = "";
    document.getElementById('nuevo-calorias').value = "";
    
    //AGREGAR NUEVO PRODUCTO A LA LISTA Y MOSTRAR MENSAJE.
    contenedorComidas = document.getElementById('comidas');
    contenedorComidas.innerHTML += "<div class='comida'>"
    + "<div class='comida-icono'>"
    + "<img src='"+tipoComida+"'>"
    + "</div>"
    + "<div class='comida-nombre'>" +  nombreComida + "(" + caloriasComida + "cal) </div>"
    + "<div class='comida-boton'> <button onclick='agregarCalorias("+caloriasComida+")'>+</button></div>";
    
    verAlerta('Listo!', 'Comida agregada exitosamente :)');
}

function cargarAlimentos(){
    contenedorComidas = document.getElementById('comidas');
    contador = localStorage.getItem('contadorComidas');
    
    //RECORRER EL NUMERO DE ELEMENTOS DESDE 0 HASTA CONTADOR
    i=0;
    while(i<contador){
        contenedorComidas.innerHTML += "<div class='comida'>"
        + "<div class='comida-icono'>"
        + "<img src='" + localStorage.getItem('tipo'+i) + "'>"
        + "</div>"
        + "<div class='comida-nombre'>" + localStorage.getItem('nombre'+i) + "(" + localStorage.getItem('calorias'+i) + "cal) </div>"
        + "<div class='comida-boton'> <button onclick='agregarCalorias("+localStorage.getItem('calorias'+i)+")'>+</button></div>";
        i++;    
    }
    
    //CARGAR LAS CALORIAS ACTUALES
    fecha = new Date();
    diaActual = fecha.getDate() + '/' + fecha.getMonth();
    if(localStorage.getItem('diaActual') == diaActual){
        document.querySelector('.calorias').innerHTML = localStorage.getItem('caloriasGuardadas');
    }else{
        document.querySelector('.calorias').innerHTML = "0";
    }
    
}

function agregarCalorias(calorias){
    //CREAR OBJETO DATE()
    fecha = new Date();
    //GETMONTH  (0 - 11)
    diaActual = fecha.getDate() + '/' + fecha.getMonth();
    if(localStorage.getItem('diaActual') == diaActual){
        //LOS DIAS COINCIDEN, LAS CALORIAS SON CONCATENADAS
        caloriasGuardadas = localStorage.getItem('caloriasGuardadas');
    }else{
        //LOS DIAS NO COINCIDEN, SE COMIENZA DE CERO
        caloriasGuardadas = 0;
    }

    contenedorCalorias = document.querySelector('.calorias');
    //
    contenedorCalorias.innerHTML = caloriasGuardadas;
    //
    caloriasActuales = contenedorCalorias.innerHTML;
    caloriasTotales = parseInt(caloriasActuales) + calorias;
    contenedorCalorias.innerHTML = caloriasTotales;
    
    //GUARDAR EL DIA ACTUAL, GUARDAR LAS CALORIAS TOTALES
    localStorage.setItem('diaActual', diaActual);
    localStorage.setItem('caloriasGuardadas', caloriasTotales)
}

function guardarPeso(){
    peso=document.getElementById('peso').value;
    vasos=parseInt(peso)/7;
    vasos=Math.round(vasos);
    console.log(vasos);
    localStorage.setItem('vasos',vasos);
    localStorage.setItem('peso',peso);
    //DESAPARECER MENSAJE
    document.getElementById('popup').style.opacity="0";
    document.getElementById('popup').style.visibility="hidden";
    document.getElementById('popup').style.transition="1s all";

    
}


function agregarVaso(){
    if(localStorage.getItem('vasostomados')){
        vasostomados =localStorage.getItem('vasosTomados')
    }else{
        vasosTomados=0;
    }
    if(topActual>0){}
        agua=document.getElementById('agua');
        topActual=topActual-alturaVaso;
        agua.style.top=topActual + "%";
        agua.style.transition=".1s all";
        agua.style.webkitTransform="rotate(10deg)";
        agua.style.width="200%";
        aqua.style.height="120%";
        agua.style.left ="-50%";
        setTimeout(function(){agua.style.webkitTransform="rotate(-10deg)"},200)
        setTimeout(function(){agua.style.webkitTransform="rotate(5deg)"},400)
        setTimeout(function(){agua.style.webkitTransform="rotate(-5deg)"},600)
        setTimeout(function(){agua.style.webkitTransform="rotate(2deg)"},800)
        setTimeout(function(){agua.style.webkitTransform="rotate(2deg)"},1000)
        setTimeout(function(){agua.style.webkitTransform="rotate(0deg)"},1100)

        vasosTomados++;
        localStorage.setItem('vasosTomados',vasosTomados);
        localStorage.setItem('topActual',topActual);
    }
}












