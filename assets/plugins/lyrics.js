/*

Copyright (C) 2021 ππ€ππ²π²π» π‘πΆπΉππ.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const Nilu = QueenNilu.events
const Build = QueenNilu.build
const {MessageType, Mimetype} = require('@blackamda/queenamdi-web-api');
const axios = require("axios")

const Language = require('../language');
const Lang = Language.getString('lyric');
let LOL = Build.WORKTYPE == 'public' ? false : true


Nilu.operate({ pattern: 'lyric ?(.*)', fromMe: LOL, desc: Lang.LY_DESC,  deleteCommand: false}, (async (message, match) => {
    await QueenNilui.nilu_setup()
    if (match[1] == '') return await message.client.sendMessage(message.jid, Lang.NEED_WORD, MessageType.text, { quoted: message.data });

    try {
        const title = match[1]
        const lyricdata = await QueenNilu.lyric(title)

        var media = await axios.get(lyricdata.thumb, {responseType: 'arraybuffer'})
        var PIC = Buffer.from(media.data)

        await message.client.sendMessage(message.jid, PIC, MessageType.image, {mimetype: Mimetype.png, caption: lyricdata.lirik, quoted: message.data, thumbnail: PIC});
    } catch {
        return await message.client.sendMessage(message.jid, Lang.NO_RESULT, MessageType.text, { quoted: message.data });
    }
}))