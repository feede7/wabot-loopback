const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const TEST_TRIGGER_WORD = '@botest'

const { mensajeHorarios, mensajeVolverMenu, mensajeChat } = require('./variables_escuela/mensajes')

/**
 * Bot que testea Bots (Fede)
 */
const flowLoopback = addKeyword([TEST_TRIGGER_WORD])
  .addAction(
    null,
    async (ctx, { flowDynamic }) => {
      const msgSplit = ctx.body.split(' ')
      let start = 0
      let delay = 0
      console.log(`mensaje: ${ctx.body}`)

      if (isNaN(parseInt(msgSplit[1]))) {
        start = 1
        delay = 1000
      } else {
        start = 2
        delay = parseInt(msgSplit[1])
        console.log('delay' + `${delay}`)
      }

      for (let i = start; i < msgSplit.length; i++) {
        msg = msgSplit[i].replaceAll('%20', ' ')
        console.log(`${msg}`)
        await flowDynamic([{ body: msg, delay }])
      }
    }
  )

/*
const flowTalleres = addKeyword(['b', 'talleres', 'talleres de extensión']).addAnswer(
  [
    'Para obtener toda la info sobre los *talleres de extensión* de adultos, adolescentes y niños, inscripciones, dónde se dictan, etc. visitar el siguiente link',
    'https://escuelarogelioyrurtia.edu.ar']).addAnswer([
  'Escribe _menú_ para volver'
])
*/

/*
const flowOtrasinscripciones = addKeyword(['c', 'otras inscripciones']).addAnswer(
  ['Aquí te dejo otras inscripciones que ofrecemos 👇']).addAnswer([
  '',
  'A. Mesas de examen',
  'B. Jornadas de las artes del fuego',
  'C. Ciclo de charlas',
  '',
  'Escribe _menú_ para volver'

],
null,
null,
[flowMesasdeexamen, flowJornadasadf, flowCiclocharlas]

)
*/
/*

const flowInscripcioncarreras = addKeyword(['carreras', 'a']).addAnswer(
  [

    '*Inscripciones a carreras:* para inscribirte tenés que seguir los siguientes pasos:',
    '',
    '👉 Completar el formulario de inscripción de la carrera que quieras hacer, podes ver qué carreras ofrecemos y los formularios en este link:',
    'https://escuelarogelioyrurtia.edu.ar/pre-inscripcion-2024/',
    '👉 Una vez completado el formulario tenés que traer la *documentación* personalmente que figura en el link anterior.',
    'Podés hacerlo en nuestros horarios de funcionamiento, aunque es preferible que lo hagas dentro del horario que elegiste para cursar.',
    'Si sos ingresante este link puede orientarte:',
    'https://escuelarogelioyrurtia.edu.ar/ingresantes-2024/',
    ''])
  .addAnswer(['_Aclaración_: Si el formulario no adminte más respuestas tenés que concurrir personalmente a la institución y anotarte en lista de espera.'

  ],
   null,
   null,
  [flowTalleres, flowOtrasinscripciones]
  )
*/

const flowInscripciones = addKeyword(['inscripciones', 'a', 'A',],{sensitive:true})
  .addAnswer(['Nuestras *inscripciones 2024* están abiertas!',
    'Te dejamos toda la info:'])
  .addAnswer(['*Carreras* 👇',
    'Necesitás seguir los siguientes pasos:',
    '',
    '👉 Completar el formulario de inscripción de la carrera que quieras hacer, podes ver qué carreras ofrecemos y los formularios en este link:',
    'https://escuelarogelioyrurtia.edu.ar/pre-inscripcion-2024/',
    '👉 Una vez completo tenés que traer la *documentación* personalmente que figura en el link anterior.',
    'Podés hacerlo en nuestros horarios de funcionamiento, aunque es preferible que lo hagas dentro del horario que elegiste para cursar.',
    'Si sos ingresante este link puede orientarte:',
    'https://escuelarogelioyrurtia.edu.ar/ingresantes-2024/'])
  .addAnswer(['_Aclaración_: Si el formulario no admite más respuestas tenés que concurrir personalmente a la institución y anotarte en lista de espera.'])
  .addAnswer(['Para obtener toda la info sobre los *talleres de extensión* de adultos, adolescentes y niños, inscripciones, dónde se dictan, etc. visitar el siguiente link',
    'https://escuelarogelioyrurtia.edu.ar/talleres-de-extension-2024'])
  .addAnswer(['Escribe _menú_ para volver'])

const flowOferta = addKeyword(['b', 'B', 'oferta educativa'],{sensitive:true})
  .addAnswer(['Estudiá y obtené una formación completa como profesional o como docente de las Artes del fuego ❤️‍🔥'])
  .addAnswer(['👉 Podés encontrar la *oferta educativa* sobre nuestras carreras en nuestro sitio web',
    '',
    '*Profesorado en Artes Visuales* https://escuelarogelioyrurtia.edu.ar/profesorado-artes-visuales/',
    '*Tecnicaturas* https://escuelarogelioyrurtia.edu.ar/tecnicaturas/',
    '*Talleres de extensión* https://escuelarogelioyrurtia.edu.ar/talleres-para-adultos/'])
  .addAnswer(['Escribe _menú_ para volver al menú principal'])

const flowNovedades = addKeyword(['c', 'C','novedades'],{sensitive:true})
  .addAnswer(['Para conocer nuestras últimas noticias y obtener información sobre nuestra Escuela te recomendamos visitar este link 👇',
    'https://escuelarogelioyrurtia.edu.ar/novedades/'])
  .addAnswer(['Escribe _menú_ para volver al menú principal.'])

/*
    'B. Talleres de extensión',
    'C. Otras inscripciones'

  ],
  null,
  null,

  [flowInscripcioncarreras, flowTalleres, flowOtrasinscripciones]

)
*/

/*
'Para info sobre los *talleres de extensión* de adultos, adolescentes y niños visitar el siguiente link',
    'https://escuelarogelioyrurtia.edu.ar',
    '',
    '1. *Oferta* para ver nuestra oferta educativa con todas las carrears y talleres que ofrecemos',
    '3. *Horarios* para conocer nuestros días y horarios de atención',
    '4. *Dónde estamos* para conocer nuestra ubicación'
*/

const flowhorarios = addKeyword(['horarios', 'd', 'D'],{sensitive:true})
  .addAnswer(['Estamos en Calle Dorrego 2081, Mar del Plata.',
    '',
    'Nuestros horarios de atención son de lunes a sábados de 08 a 22 hs.',
    'Podes escribirnos a contacto@escuelarogelioyrurtia.edu.ar y nos comunicaremos a la brevedad.'])
  .addAnswer(['Escribe _menú_ para volver al menú principal.'])

const flowCorreos = addKeyword(['correos', 'correos útiles', 'e', 'E'],{sensitive:true})
  .addAnswer(['Te brindamos nuestros correos de contacto de las diferentes áreas 📧'])
  .addAnswer([
    '*Contacto*: Para consultas generales y recibir información orientativa 👉 contacto@escuelarogelioyrurtia.edu.ar',
    '',
    '*Dirección*: Para pedidos o consultas formales académicas e institucionales 👉 direccion@escuelarogelioyrurtia.edu.ar',
    '',
    '*Secretaría*: Para consultas sobre analíticos, licencias, contralor, etc. 👉 secretaria@escuelarogelioyrurtia.edu.ar',
    '',
    '*Regencia*: Para consultas específicas sobre las carreras, acreditaciones, solicitudes generales 👉 regencia@escuelarogelioyrurtia.edu.ar',
    '',
    '*Gestión cultural*: Para solicitudes interinstitucionales, visitas de escuelas, exposiciones,  etc. 👉 gestioncultural@escuelarogelioyrurtia.edu.ar',
    '',
    '*Biblioteca*: Para acceder a nuestro material bibliográfico físico, digital y audiovisual, ser socio, etc 👉 biblioteca@escuelarogelioyrurtia.edu.ar'])
  .addAnswer(['Escribe _menú_ para volver al menú principal.'])

const flowHorariosmaterias = addKeyword(['Horarios de las materias', 'f', 'F'],{sensitive:true})
  .addAnswer(['Te dejamos el link para que veas los *horarios 2024* de las materias 🤲',
    '',
    'https://escuelarogelioyrurtia.edu.ar/horarios-de-las-materias/'])
  .addAnswer(['Escribe _menú_ para volver al menú principal.'])

const flowEquivalencias = addKeyword(['equivalencias', 'g', 'G'],{sensitive:true})
  .addAnswer(['Para consultas sobre *equivalencias*, cómo y cuándo solicitarlas, requisitos, etc. contactarse al siguiente correo:',
    '',
    'Sobre el Profesorado en Artes Visuales 👉 japroba@escuelarogelioyrurtia.edu.ar',
    '',
    'Sobre las Tecnicaturas 👉 jatex@escuelarogelioyrurtia.edu.ar'])
  .addAnswer(['Escribe _menú_ para volver al menú principal.'])

const flowMesasdeexamen = addKeyword(['h', 'H','mesas de examen'],{sensitive:true})
  .addAnswer(['Para obtener toda la info sobre las *mesas de exámen* ingresá al siguiente link 👇',
    'https://escuelarogelioyrurtia.edu.ar/category/llamado-a-mesas/'])
  .addAnswer(['Escribe _menú_ para volver al menú principal.'])

const flowJornadasyciclo = addKeyword(['i','I','jornadas'],{sensitive:true})
  .addAnswer([
    'Las *Jornadas de las artes del fuego* son un espacio institucional anual que tiene el fin de reunir a artistas de diferentes zonas a intercambiar experiencias con nuestros estudiantes y docentes y el público en general.',
    '',
    'Por el momento no está programado el próximo evento pero te dejamos este link que puede servirte 🙂',
    '',
    'https://escuelarogelioyrurtia.edu.ar/jornadas/'])
  .addAnswer(['*El ciclo de charlas* es un espacio de intercambio entre docentes, estudiantes y artistas externos de la institución.',
    'La finalidad de los encuentros es la riqueza y experiencia del conocimiento compartido.'])
  .addAnswer(['Por el momento no está programado el próximo encuentro pero te dejamos nuestro canal de YouTube para que veas los de años anteriores:',
    'https://www.youtube.com/@escueladeceramicamardelpla9172/playlists'])
  .addAnswer(['Escribe _menú_ para volver.'])

/**
 * Listas para Flujo Principal
 */
const opcionesHola = ['Hola!','hola','buenos días','buenas tardes','buenas','que tal', 'qué tal',]
const opcionesGracias = ['adiós', 'adios','👍','👍','abrazo','saludos','gracias','muchas gracias','gracias!',]
const opcionesMenu = ['sarachi','menú', 'menu', 'sarasa']

const todoJunto = opcionesHola.concat(opcionesGracias).concat(opcionesMenu)

let usuarioBloqueado = false
let vieneDelMenu = false

const flowPrincipal = addKeyword(todoJunto)
 .addAction(
  null,
  async (ctx, {flowDynamic}) => {
      console.log(ctx.body)
      console.log(usuarioBloqueado)
      console.log('entrooooooooo ppal')

      if (!usuarioBloqueado){
        if (opcionesHola.includes(ctx.body)){
            await flowDynamic([{ body: '🙌 ¡Hola, Te damos la bienvenida¡ Soy _*Barbotín*_ y soy asistente de la *Escuela de Cerámica Rogelio Yrurtia de Mar del Plata*'}])
            await flowDynamic([{ body: 'Escribe _menú_ y te ofrezco unas opciones.'}])
        }

        if (opcionesMenu.includes(ctx.body)){
            vieneDelMenu = true
            await flowDynamic([{ body: 'Te voy a ayudar a conseguir la información que necesitás 💪😉, contame, ¿qué te trae por acá? Escribí una opción:\n' +
                                        '\n' +
                                        'A. Inscripciones 📃\n' +
                                        'B. Oferta educativa 👨‍🎓\n' +
                                        'C. Novedades\n' +
                                        'D. Ubicación y Horarios de atención\n' +
                                        'E. Correos útiles\n' +
                                        'F. Horarios de las materias\n' +
                                        'G. Equivalencias\n' +
                                        'H. Mesas de examen\n' +
                                        'I. Jornadas y ciclo de charlas\n' +
                                        'J. Chater con nuestro personal' }])
        }

        if (opcionesGracias.includes(ctx.body))
            await flowDynamic([{ body: 'Nha gracia a vo 🤠'}])
      }
  })
 .addAction(
  {capture: true},
  async (ctx, {flowDynamic, fallBack}) => {

    console.log(ctx.body)
    console.log('entrooooooooo ppal2')

    if (usuarioBloqueado){
        if (ctx.body === 'feldespato' | ctx.body === 'cuarzo'){
            usuarioBloqueado = false
            await flowDynamic([{ body: 'Barbotín te manda un beso 😘' }])
        }
        else {
            console.log('El usuario sigue bloqueado')
            return fallBack()
        }
    }

    if (vieneDelMenu){
        /**
         * Flujo de respuesta a opción D. Horarios
         */
        if (ctx.body === 'd' | ctx.body === 'D' | ctx.body.includes('horario')){
            await flowDynamic([{ body: mensajeHorarios }])
            await flowDynamic([{ body: mensajeVolverMenu }])
        }

        /**
         * Flujo para Chat con alguien
         */
        if (ctx.body === 'j' | ctx.body === 'J' | ctx.body.includes('chat')){
            console.log('El usuario ha sido bloqueado')
            usuarioBloqueado = true
            await flowDynamic([{ body: mensajeChat }])
            return fallBack()
            }
    }

    vieneDelMenu = false
  })


const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowPrincipal, flowLoopback])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  console.log('Lo que quieras')
  console.log(todoJunto)

  QRPortalWeb()
}

main()
