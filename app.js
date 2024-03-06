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

const flowLoopback = addKeyword(['@botest'])
  .addAnswer(
    [
      'Bueno, ahí va, agarrate 🫠'
    ],
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

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowLoopback])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  const HOLA = 'pedo'
  console.log(`que onda ${HOLA.replace('ped', 'cac')}`)

  const msgSplit = 'habia una vez un circo'.split(' ')
  for (let i = 1; i < msgSplit.length; i++) {
    console.log(`${msgSplit[i]}`)
    sleep(500)
  }

  for (const msg of msgSplit) {
    if (msg !== 'habia') {
      console.log(`${msg}`)
      sleep(500)
    }
  }

  QRPortalWeb()
}

main()
