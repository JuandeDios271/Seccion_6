require('dotenv').config()


const { leerInput, inquiereMenu, pausa, listarLugares } = require('./helpers/inquierer');
const Busquedas = require('./models/busquedas');


const main = async() => {
    const busquedas = new Busquedas();
    let opt;
   do {
    
    opt = await inquiereMenu();
    
    switch(opt ) {
        case 1:
            //MOstrar Mnesaje
            const lugar = await leerInput('Ciudad: ');
            
            //Buscar Los Lugares
            const lugares = await busquedas.ciudad( lugar );

            //Seleccionar el Lugar
            const id = await listarLugares(lugares);
            if( id=== '0' ) continue;
            const lugarSel = lugares.find( l => l.id === id );

            //Guardar en Db
            busquedas.agregarHistorial( lugarSel.nombre);
            
           


            //Datos del clima
            const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng ); 
            
            //Mostrar Resultados
            console.clear();
            console.log('\n Informacion de la ciudad\n'.green);
            console.log('Ciudad: ', lugarSel.nombre );
            console.log('Lat:', lugarSel.lat );
            console.log('Lng:', lugarSel.lng );
            console.log('Temperatura:', clima.temp);
            console.log('Mnima:', clima.min);
            console.log('Maxima:', clima.max);
            console.log('Como esta el Clima:',clima.desc );


        break;

        case 2:
            busquedas.historialCapitalizado.forEach( (lugar, i) =>{
                const idx = `${ i + 1}`.green;
                console.log( `${idx} ${lugar}  `);
            })
        
        break;
    }

    if( opt !== 0 ) await pausa();

   } while (opt !== 0)



}


main();