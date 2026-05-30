import fs from 'fs'
import path from 'path'
import acrcloud from 'acrcloud'
import ffmpeg from 'fluent-ffmpeg'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupwqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!/audio|video/.test(mime)) {
    throw '💭 Responda a un audio o video'
  }

  if (!fs.existsSync('./tmp')) {
    fs.mkdirSync('./tmp', { recursive: true })
  }

  try {

    let media = await q.download()

    let inputPath = path.join('./tmp', `${Date.now()}`)
    let outputPath = path.join('./tmp', `${Date.now()}.mp3`)

    // Detectar extensión
    let ext = mime.split('/')[1]

    inputPath += `.${ext}`

    fs.writeFileSync(inputPath, media)

    // SI ES VIDEO → convertir a mp3
    if (/video/.test(mime)) {

      await new Promise((resolve, reject) => {

        ffmpeg(inputPath)
          .audioBitrate(128)
          .format('mp3')
          .save(outputPath)
          .on('end', resolve)
          .on('error', reject)

      })

    } else {

      // SI YA ES AUDIO
      outputPath = inputPath

    }

    let audioBuffer = fs.readFileSync(outputPath)

    let res = await acr.identify(audioBuffer)

    let { code, msg } = res.status

    if (code !== 0) {
      throw msg
    }

    let info = res.metadata?.music?.[0] || {}

    let title = info.title || 'No encontrado'

    let artists = info.artists
      ? info.artists.map(v => v.name).join(', ')
      : 'No encontrado'

    let album = info.album?.name || 'No encontrado'

    let genres = info.genres
      ? info.genres.map(v => v.name).join(', ')
      : 'No encontrado'

    let release_date = info.release_date || 'No encontrado'

    let txt = `
𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼

• 🌻 𝙏𝙄𝙏𝙐𝙇𝙊: ${title}
• 🍃 𝘼𝙍𝙏𝙄𝙎𝙏𝘼: ${artists}
• 💻 𝘼𝙇𝘽𝙐𝙈: ${album}
• 🍂 𝙂𝙀𝙉𝙀𝙍𝙊: ${genres}
• 🪙 𝙁𝙀𝘾𝙃𝘼: ${release_date}
`.trim()

    m.reply(txt)

    // borrar archivos
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath)
    }

    if (fs.existsSync(outputPath) && outputPath !== inputPath) {
      fs.unlinkSync(outputPath)
    }

  } catch (e) {

    console.log(e)

    m.reply(`❌ Error:\n${e}`)

  }

}

handler.command = ['whatmusic', 'quemusica', 'quemusicaes']

export default handler
