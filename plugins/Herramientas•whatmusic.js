import fs from 'fs'
import path from 'path'
import acrcloud from 'acrcloud'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (/audio|video/.test(mime)) {
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    let media = await q.download()
    let ext = mime.split('/')[1]
    let filePath = path.join('./tmp', `${m.sender}.${ext}`)
    fs.writeFileSync(filePath, media)
    let res = await acr.identify(media)
    let { code, msg } = res.status
    if (code !== 0) {
      fs.unlinkSync(filePath)
      throw msg
    }
    let info = res.metadata?.music?.[0] || {}
    let title = info.title || 'No encontrado'
    let artists = info.artists ? info.artists.map(v => v.name).join(', ') : 'No encontrado'
    let album = info.album?.name || 'No encontrado'
    let genres = info.genres ? info.genres.map(v => v.name).join(', ') : 'No encontrado'
    let release_date = info.release_date || 'No encontrado'
    let txt = `
𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼 

• 🌻 𝙏𝙄𝙏𝙐𝙇𝙊: ${title}
• 🍃 𝘼𝙍𝙏𝙄𝙎𝙏𝘼: ${artists}
• 💻 𝘼𝙇𝘽𝙐𝙈: ${album}
• 🍂 𝙂𝙀𝙉𝙀𝙍𝙊: ${genres}
• 🪙 𝙁𝙀𝘾𝙃𝘼 𝘿𝙀 𝙇𝘼𝙉𝙕𝘼𝙈𝙄𝙀𝙉𝙏𝙊: ${release_date}
`.trim()
    fs.unlinkSync(filePath)
    m.reply(txt)
  } else {
    throw '💭 Responda A Un Audio O Video'
  }
}

handler.command = ['quemusica', 'quemusicaes', 'whatmusic']
export default handler
