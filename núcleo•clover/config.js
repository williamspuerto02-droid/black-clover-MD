import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─✞─ CONFIGURACIÓN GLOBAL ─✞─*

// BETA: Número del bot
global.botNumber = ''; // Ejemplo: 525568138672
//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.owner = [
  ['13463689362', '🜲 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 👻', true],
  ['13463689362'],
  ['593988839188', 'BrayanOFC', true],
  ['593988839188', '', false], // Espacios opcionales
  ['573244278232', 'Brayan uchiha 🐦‍⬛', true],
  ['', '', false]
];
global.mods = ['13463689362'];
global.suittag = ['13463689362'];
global.prems = ['13463689362'];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.libreria = 'Baileys';
global.baileys = 'V 6.7.9';
global.languaje = 'Español';
global.vs = '2.2.0';
global.vsJB = '5.0';
global.nameqr = 'black clover- Bot';
global.sessions = 'blackSession';
global.jadi = 'blackJadiBot';
global.blackJadibts = true;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.packsticker = `
  𝐒𝐢𝐟𝐮 𝐁𝐨𝐭 ᚲ ᵇʸ ᶜᵃʳˡᵒˢ`;

global.packname = '𝐓𝐡𝐞 𝐒𝐢𝐟𝐮 𝐁𝐨𝐭 🐶';

global.author = `
♾━━━━━━━━━━━━━━━♾`;
//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.wm = '𝐒𝐢𝐟𝐮 𝐁𝐨𝐭 🐶';
global.titulowm = '𝐒𝐢𝐟𝐮 𝐁𝐨𝐭';
global.igfg = 'ᥫ𝐓𝐇𝐄 𝐒𝐈𝐅𝐔 𝐁𝐎𝐓'
global.botname = '𝐒𝐢𝐟𝐮 𝐁𝐨𝐭 🐶'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ the Legends ⚡'
global.textbot = '𝑺𝑰𝑭𝑼 𝑩𝑶𝑻  : 𝐓𝐇𝐄 𝑺𝑰𝑭𝑼'
global.gt = '͟͞𝕭𝖑𝖆𝖈𝖐 𝕮𝖑𝖔𝖛𝖊𝖗 ☘͟͞';
global.namechannel = '𝐒𝐢𝐟𝐮 / 𝐰𝐚𝐨𝐬'
// Moneda interna
global.monedas = 'monedas';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.gp1 = 'https://chat.whatsapp.com/IbADO35sBSC4G1FBTGbHIE?mode=ac_t';
global.gp2 = 'https://chat.whatsapp.com/FiBcPMYEO7mG4m16gBbwpP?mode=ac_t';
global.comunidad1 = 'https://chat.whatsapp.com/FgQ4q11AjaO8ddyc1LvK4r?mode=ac_t';
global.channel = 'https://whatsapp.com/channel/0029VbB36XC8aKvQevh8Bp04';
global.cn = global.channel;
global.yt = 'https://www.youtube.com/@ElCarlos.87';
global.md = 'https://github.com/thecarlos19/black-clover-MD';
global.correo = 'thecarlospcok@gmail.com';

global.catalogo = fs.readFileSync(new URL('../src/catalogo.jpg', import.meta.url));
global.photoSity = [global.catalogo];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.estilo = { 
  key: {  
    fromMe: false, 
    participant: '0@s.whatsapp.net', 
  }, 
  message: { 
    orderMessage: { 
      itemCount : -999999, 
      status: 1, 
      surface : 1, 
      message: global.packname, 
      orderTitle: 'Bang', 
      thumbnail: global.catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
};

global.ch = { ch1: "120363419782804545@newsletter" };
global.rcanal = global.ch.ch1;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.multiplier = 69;
global.maxwarn = 3;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'núcleo•clover/config.js\''));
  import(`${file}?update=${Date.now()}`);
});
