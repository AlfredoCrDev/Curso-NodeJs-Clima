require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async() =>{

    //Instancia de la Clase busquedas
    const busquedas = new Busquedas();

    //variable de opciones
    let opt= '';

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        //Swicth para los distintas opciones
        switch (opt) {
            case 1:
                // Mostrar Mensaje
                const terminoDebusqueda = await leerInput('Ciudad: ')
               
                //Buscar Lugar
                const lugares = await busquedas.ciudad( terminoDebusqueda );
                
                //Seleccionar Lugar
                const id = await listarLugares( lugares );
                if( id === '0') continue;

                const lugarSel = lugares.find ( l => l.id === id);
                //GUARDAR EN DB
                busquedas.agregarHistorial( lugarSel.nombre);

                //Clima

                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                //Mostrar Resultado
                console.log('\nInformacion de la Ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Estado Actual : ', clima.desc);


            break;

            case 2:
                busquedas.HistorialCapitalizado.forEach( (lugar, i) =>{
                    const idx = `${ i + 1}.`.green;
                    console.log( `${ idx } ${ lugar }`);
                })
            break;
            
            case 3: 
                // Salir
                tareas.listarPendientesCompletadas(true);
            break;
                         
        }

        await pausa();

    } while( opt !== 0 )

}

main ();