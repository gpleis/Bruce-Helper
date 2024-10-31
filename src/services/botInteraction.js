function handleBotInteraction(message) {
    let entry = message.content.toLowerCase()

    // Boa bot
    if (entry === 'boa bot, tô gostando de ver') {
        message.channel.send(':blush:')
    }
    // Não bot
    else if (entry === 'não bot, assim não') {
        message.channel.send(':pleading_face:')
    }
    // Bot burro
    else if (entry.includes('bot') && entry.includes('burro')) {
        message.channel.send('burro é vc seu filho da puta')
    }
    // Te amou
    else if (entry.includes('te amo bot')) {
        message.channel.send('<:meuovo:864235249180737586>')
    }
}

module.exports = { handleBotInteraction }