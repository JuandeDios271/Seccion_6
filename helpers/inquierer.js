const inquirer = require('inquirer');
//const { default: Choice } = require('inquirer/lib/objects/choice');
require('colors');

const pregutas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿QUE DESEA HACER?',
        choices: [
            {
                value: 1,
                name: `${'1.'.red} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.red} Historial`
            },
            {
                value: 0,
                name: `${'0.'.red} salir`
            },
           
        ]
    }
    
];

const inquiereMenu = async() => {
    console.clear();
    console.log('==========================='.red);
    console.log('   Seleccione una opción   '.red);
    console.log('===========================\n'.red);

    const {opcion} = await inquirer.prompt(pregutas);

    return opcion;


}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'Enter',
            message: `Presione ${' ENTER'.green} para continuar`

        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async() => {
    const question = [
        {
            type: 'input',
            name: 'ciudad',
           
            
            validate( value ){
                if( value.length === 0 ){
                    return ' POR FAVOR INGRESE UN VALOR';
                }
                return true;
            }
        }
    ];

    const { ciudad } = await inquirer.prompt(question);
    return ciudad;

}

const listarLugares= async( lugares = [] ) => {
    const choices = lugares.map( (lugar,i) => {
        const idx = `${i +1}.`.green;
        return{
            value: lugar.id,
            name: `${ idx } ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar :',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
    
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {
    const choices = tareas.map( (tarea,i) => {
        const idx = `${i +1}.`.green;
        return{
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked:( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
    
}

module.exports = {
    inquiereMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist

}