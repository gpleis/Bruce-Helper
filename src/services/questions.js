
function handleQuestions (message) {
    if (message.content.endsWith('é gay?')) {
        const gay = Math.floor((Math.random()* 10) + 1)
        if (gay % 2 == 0) {
            message.reply(`Sim.`)
        }
        else {
            message.reply(`Não.`)
        }
    }
}

module.exports = { handleQuestions }