
function handleGemidao(message) {
    let entry = message.content;
    entry = entry.normalize('NFD').replace(/[\u0300-\u036f]/g, "") // tratando acentos
    entry = entry.toLowerCase()

    if(entry.includes("gemidao") )
        
        message.channel.send(`OLHA O POMBÃO DO ${message.author} BOTANDO O GEMIDÃO`)
}

module.exports = { handleGemidao }