import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://chat.whatsapp.com/FgQ4q11AjaO8ddyc1LvK4r'

  const namechannel = 'Canal del Bot'
  const channel = 'https://whatsapp.com/channel/0029Vai28FR7dmea9gytQm3w'

  const dev = '👾 Desarrollador: @thecarlos19'
  const catalogo = 'https://files.catbox.moe/dapzy2.jpg'
  const emojis = '📡'

  let grupos = `
╭─⟪ *🌐 GRUPOS OFICIALES* ⟫
│
│ ⚔️ *${namegrupo}*
│ ${gp1}
│
│ ⚡ *${namechannel}*
│ ${channel}
│
│ ${dev}
╰─────────────────╯
`

  await conn.sendMessage(m.chat, {
    image: { url: catalogo },
    caption: grupos.trim()
  }, { quoted: m })

  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
