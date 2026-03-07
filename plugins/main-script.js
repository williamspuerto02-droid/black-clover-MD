const handler = async (m, { conn }) => {
  const texto = `
 _*𝐒𝐢𝐟𝐮 𝐛𝐨𝐭 *_ 🐶

\`\`\`Repositorio OFC:\`\`\`
https://github.com/thecarlos19/Black-clover-MD 

> 🌟 Deja tu estrellita ayudaría mucho :D

🔗 *Grupo oficial del bot:* https://chat.whatsapp.com/D9QyBFerfvoFxC3AIy18eH?mode=gi_t
  `.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['script']
handler.tags = ['info']
handler.command = ['script']

export default handler

