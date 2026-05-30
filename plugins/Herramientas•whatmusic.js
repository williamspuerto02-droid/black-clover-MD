import fs from 'fs'
import path from 'path'
import acrcloud from 'acrcloud'
import yts from 'yt-search'
import ffmpeg from 'fluent-ffmpeg'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupwqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!/audio|video/.test(mime)) {
    throw `⚠️ Responde a un audio o video.`
  }

  if (!fs.existsSync('./tmp')) {
    fs.mkdirSync('./tmp', { recursive: true })
  }

  try {

    let media = await q.download()
    if (!media) throw 'No se pudo descargar el archivo.'

    let inputPath = path.join('./tmp', `${Date.now()}.mp4`)
    let outputPath = path.join('./tmp', `${Date.now()}.mp3`)

    fs.writeFileSync(inputPath, media)

    // Convertir a MP3
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .audioBitrate(128)
        .save(outputPath)
        .on('end', resolve)
        .on('error', reject)
    })

    let audioBuffer = fs.readFileSync(outputPath)

    let res = await acr.identify(audioBuffer)

    let { code, msg } = res.status

    if (code !== 0) {
      throw msg || 'No se encontró la canción.'
    }

    let info = res.metadata?.music?.[0] || {}

    let title = info.title || 'Desconocido'
    let artists = info.artists?.map(v => v.name).join(', ') || 'Desconocido'
    let album = info.album?.name || 'Desconocido'
    let genres = info.genres?.map(v => v.name).join(', ') || 'Desconocido'
    let release_date = info.release_date || 'Desconocido'

    let txt = `
🎧 *CANCIÓN ENCONTRADA*

🌻 *Título:* ${title}
🎤 *Artista:* ${artists}
💿 *Álbum:* ${album}
🎶 *Género:* ${genres}
📅 *Lanzamiento:* ${release_date}
`.trim()

    let search = await yts(`${title} ${artists}`)
    let video = search.videos?.[0]

    let buttons = []

    if (video) {
      buttons.push({
        buttonId: `${usedPrefix}play ${title}`,
        buttonText: { displayText: '🎵 Descargar Música' },
        type: 1
      })
    }

    await conn.sendMessage(m.chat, {
      text: txt,
      footer: 'Music Finder',
      buttons,
      headerType: 1
    }, { quoted: m })

    // Eliminar archivos temporales
    fs.unlinkSync(inputPath)
    fs.unlinkSync(outputPath)

  } catch (e) {
    console.log(e)
    m.reply(`❌ Error:\n${e}`)
  }
}

handler.command = ['whatmusic', 'quemusica', 'shazam']

export default handler
