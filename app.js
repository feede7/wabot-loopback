const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

function sleep (milliseconds) {
  const start = new Date().getTime()
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break
    }
  }
}

const TEST_TRIGGER_WORD = '@botestfede'

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
        const msg = msgSplit[i].replaceAll('%20', ' ')
        console.log(`${msg}`)
        await flowDynamic([{ body: msg, delay }])
      }
    }
  )

const flowSecundario = addKeyword(['cacahuate'])
  .addAnswer([
    'Esaaaa, muy bien!'
  ]
  )

const MAX_INTENTOS = 4
let intentos = MAX_INTENTOS

const flowPrimario = addKeyword(['almohada'])
  .addAnswer(['Bien, ahora tenés que decir *cacahuate*'], null, null)
  .addAction({ capture: true },
    async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
      console.log(`msg2: ${ctx.body}`)
      if (ctx.body === 'cacahuate') {
        intentos = MAX_INTENTOS
        await gotoFlow(flowSecundario)
      } else {
        intentos--
        if (intentos > 0) {
          await flowDynamic([{ body: `Dale, *cacahuate* tenés que escribir!` }])
          return fallBack()
        } else {
          intentos = 4
          await flowDynamic([{ body: 'Me cansé, perdiste!' }])
        }
      }
    }

  )

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowLoopback, flowPrimario])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  const HOLA = 'pedo'
  console.log(`que onda ${HOLA.replace('ped', 'cac')}`)

  const msgSplit = 'habia una vez un circo'.split(' ')

  for (const msg of msgSplit) {
    if (msg !== 'habia') {
      console.log(`${msg}`)
      sleep(100)
    }
  }

  QRPortalWeb()
}

main()
