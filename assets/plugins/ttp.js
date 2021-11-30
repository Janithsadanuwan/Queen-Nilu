/*

Copyright (C) 2021 💙𝗤𝘂𝗲𝗲𝗻 𝗡𝗶𝗹𝘂💙.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const Nilu = QueenNilu.events
const Build = QueenNilu.build
const { MessageType, MessageOptions, Mimetype } = require('@blackamda/queenamdi-web-api');
const fs = require("fs")
const axios = require('axios');
const cwebp = require('cwebp-bin');
const request = require('request');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
let LOL = Build.WORKTYPE == 'public' ? false : true


var LISTDESC = ''
if (Build.LANG == 'SI') LISTDESC = '╔═══════❪💃🏻💙❫\n\n▷ *💠🧩 විවිධ TTP ලැයිස්තුව 🧩💠* ◁\n\n╚═════≪ •❈• ≫═════'
if (Build.LANG == 'EN') LISTDESC = '╔═══════❪💃🏻💙\n\n▷ *💠🧩 Custom TTP List 🧩💠* ◁\n\n╚═════≪ •❈• ≫═════'

var NEED_WORD = ''
if (Build.LANG == 'SI') NEED_WORD = '*ඔබ වචන ඇතුළත් කළ යුතුය!*'
if (Build.LANG == 'EN') NEED_WORD = '*Please enter words!*'

var TTP_DESC = ''
if (Build.LANG == 'SI') TTP_DESC = 'විවිධ TTP ස්ටිකර් සාදන්න.'
if (Build.LANG == 'EN') TTP_DESC = 'Make custom TTP stickers.'

var SELECT = ''
if (Build.LANG == 'SI') SELECT = 'TTP style තෝරන්න'
if (Build.LANG == 'EN') SELECT = 'Select TTP style'

var TTP1 = ''
if (Build.LANG == 'SI') TTP1 = 'සජීවිකරණ දේදුනු text ස්ටිකරය.'
if (Build.LANG == 'EN') TTP1 = 'Animated rainbow text sticker.'

var TTP2 = ''
if (Build.LANG == 'SI') TTP2 = 'නිල් text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP2 = 'Blue text sticker. [Sinhala font supported]'

var TTP3 = ''
if (Build.LANG == 'SI') TTP3 = 'රෝස text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP3 = 'Pink text sticker. [Sinhala font supported]'

var TTP4 = ''
if (Build.LANG == 'SI') TTP4 = 'කළු text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP4 = 'Black text sticker. [Sinhala font supported]'

var TTP5 = ''
if (Build.LANG == 'SI') TTP5 = 'සිහින් හැඩැති text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP5 = 'Fluffy style text sticker. [Sinhala font supported]'

var TTP6 = ''
if (Build.LANG == 'SI') TTP6 = 'Smurfs style text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP6 = 'Smurfs style text sticker. [Sinhala font supported]'

var TTP7 = ''
if (Build.LANG == 'SI') TTP7 = 'විදුලි text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP7 = 'Electrical text sticker. [Sinhala font supported]'

var TTP8 = ''
if (Build.LANG == 'SI') TTP8 = 'සජීවිකරණය highlight කළ text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP8 = 'Animated highlight text sticker. [Sinhala font supported]'

var TTP9 = ''
if (Build.LANG == 'SI') TTP9 = 'සජීවිකරණය කළ රතු text ස්ටිකරය. [Sinhala font supported]'
if (Build.LANG == 'EN') TTP9 = 'Animated red text sticker. [Sinhala font supported]'


Nilu.operate({pattern: 'ttp ?(.*)', fromMe: LOL, desc: TTP_DESC, dontAddCommandList: false, deleteCommand: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
    const txt = match[1]

    var BUTTHANDLE = '';
    if (/\[(\W*)\]/.test(Build.HANDLERS)) {
        BUTTHANDLE = Build.HANDLERS.match(/\[(\W*)\]/)[1][0];
    } else {
        BUTTHANDLE = '.';
    }
    
    if (txt === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text, {quoted: message.data});

    const rows = [
        {title: 'ATTP Sticker', description: TTP1, rowId: BUTTHANDLE + "attp " + txt},
        {title: 'Blue colour', description: TTP2, rowId: BUTTHANDLE + "qattpwater" + txt},
        {title: 'Pink colour', description: TTP3, rowId: BUTTHANDLE + "qattppink" + txt},
        {title: 'Black colour', description: TTP4, rowId: BUTTHANDLE + "qattpblack" + txt},
        {title: 'Highlight Colour', description: TTP8, rowId: BUTTHANDLE + "qattphigh" + txt},
        {title: 'Fluffy Style', description: TTP5, rowId: BUTTHANDLE + "qattpf" + txt},
        {title: 'Smurf Style', description: TTP6, rowId: BUTTHANDLE + "qattpsm" + txt},
        {title: 'Electrical Style', description: TTP7, rowId: BUTTHANDLE + "qattpelec" + txt},
        {title: 'Memories Style', description: TTP9, rowId: BUTTHANDLE + "qattpmem" + txt}
    ]

    const website = [
        {title: 'https://janithsadanuwan.blogspot.com/', description: "", rowId:"web"}]
       
    const sections = [{title: "TTP List", rows: rows}, {title: "Check official website :", rows: website}]
       
    const button = {
        buttonText: SELECT,
        description: LISTDESC,
        sections: sections,
        listType: 1
    }

    await message.client.sendMessage(message.jid, button, MessageType.listMessage, {quoted: message.data});
}));


// ==================TTP LIST===================================
Nilu.operate({ pattern: 'attp ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text, {quoted: message.data});
    var uri = encodeURI(match[1])
    var ttinullimage = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
    await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data })
}));


Nilu.operate({ pattern: 'qattpwater ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text,  {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Water?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/wttp.png', async() => { 
          ffmpeg('/root/Queen-Nilu/wttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: message.data});
            })
          })
        })
}));


Nilu.operate({ pattern: 'qattppink ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text,  {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Style?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/http.png', async() => { 
          ffmpeg('/root/Queen-Nilu/http.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: message.data});
            })
          })
        })
}));


Nilu.operate({ pattern: 'qattpblack ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text,  {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Blackbird?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/bttp.png', async() => { 
          ffmpeg('/root/Queen-Nilu/bttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: message.data});
            })
          })
        })
}));


Nilu.operate({ pattern: 'qattpf ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text,  {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Fluffy?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/gttp.png', async() => { 
          ffmpeg('/root/Queen-Nilu/gttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: message.data});
            })
          })
        })
}));


Nilu.operate({ pattern: 'qattpsm ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text, {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Smurfs?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/sttp.png', async() => { 
          ffmpeg('/root/Queen-Nilu/sttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker, {quoted: message.data});
            })
          })
        })
}));

Nilu.operate({ pattern: 'qattpelec ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNiu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text, {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Electric?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/ettp.png', async() => { 
          ffmpeg('/root/Queen-Nilu/ettp.png').videoFilters('chromakey=#FFFFFF:similarity=0.01').save('af.png').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker, {quoted: message.data});
            })
          })
        })
}));


Nilu.operate({ pattern: 'qattphigh ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text, {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Highlight-Animation?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/ahttp.gif', async() => { 
          ffmpeg('/root/Queen-Nilu/ahttp.gif').videoFilters('chromakey=black').save('af.gif').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.gif').outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 600x600"]).videoFilters('scale=600:600:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=600:600:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('sticker.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker, {quoted: message.data});
            })
          })
        })
}));


Nilu.operate({ pattern: 'qattpmem ?(.*)', fromMe: LOL, deleteCommand: false , dontAddCommandList: true}, (async (message, match) => {
  await QueenNilu.nilu_setup()
  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD, MessageType.text, {quoted: message.data});
        var ttinullimage = await QueenNilu.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Memories-Animation?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/Queen-Nilu/pttp.gif', async() => { 
          ffmpeg('/root/Queen-Nilu/pttp.gif').videoFilters('chromakey=white').save('af.gif').on('end', async () => {
            ffmpeg('/root/Queen-Nilu/af.gif').outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 600x600"]).videoFilters('scale=600:600:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=600:600:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('sticker.webp').on('end', async () => {
              await message.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker, {quoted: message.data});
            })
          })
        })
}));