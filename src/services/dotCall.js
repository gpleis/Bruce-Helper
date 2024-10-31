const { MessageEmbed, MessageAttachment } = require('discord.js')

function handleDotCall(message, client) {
    if (message.content.toLowerCase() === '.comandos') {
        message.reply('Lembrando que o prefixo é "." \n *kick* \n *ping* \n *gay* \n *pombão* \n *avatar* \n *play* \n *embed* \n *sn* (Decidir se sim ou não) \n *sorteio* \n O comando "é gay" é utilizado marcando e digitando "é gay" no final. \n Obviamente nem todos os comandos estão prontos, então vai reclamar na casa de cacete.')
    }
    else if (message.content.toLowerCase() === '.play sunflower') {
        message.channel.send(`-play ${(message.content).split(' ')[1]}`)
    }
    else if (message.content.toLowerCase() === `.kick ${(client.user.tag).split('#')[0].toLowerCase()}`) {    //kick
        const user = message.mentions.users.first();
        if (user) {
            const otario = message.author(user);
            if (otario) {
            otario
                .kick('Kicka a mãe')
                .then(() => {
                    message.reply(`O otário do ${otario} tentou me kickar e SE DEU MAL`)
                })
                .catch(err => {
                    message.reply(`ALGUÉM ME AJUDA, o ${otario} tá tentando me kickar e eu não consigo me vingar`);
                    console.error(err);
                });
            } 
        }  else {
            message.reply('Deu erro man.')
        } 
    }
    else if (message.content === ".ping") {                      //ping
        message.channel.send('PONG.');
    }
    else if (message.content.toLowerCase() === ".gay") {         //gay
        message.channel.send(`Gay mesmo só ${message.author}.`)
    }
    else if (message.content.toLowerCase() === ".pombão") {      //pombao
        message.channel.send(`Só se for o ${message.author}!`);
    }
    else if (message.content.toLowerCase() === ".avatar") {      //avatar
        message.channel.send(`Seu avatar é ${message.author.displayAvatarURL()}`);
    }
    else if (message.content.startsWith('.play')) {              //play
        const willsmith = new MessageAttachment('https://imgur.com/itxe78j.png');
        message.channel.send(willsmith);
    }
    else if (message.content.toLowerCase() === '.embed') {       //embed
        const embed = new MessageEmbed()
            .setTitle('Sei não man')
            .setColor(0xff0000)
            .setDescription('Maan, sei não');
        message.channel.send(embed);
    }
    else if (message.content.toLowerCase() === ".sn") {          //sn
        const sn = Math.floor((Math.random()* 10) + 1)
        if (sn % 2 == 0) {
            message.reply('Sim.')
        
        }
        else {
            message.reply('Não.')
        }
    }
    else if (message.content.toLowerCase() === '.sorteio') {     //sorteio
        const sorteio = Math.floor((Math.random()* 10) + 1)
        message.reply(sorteio)
    }
    else if(message.content.includes() === `.lol`){
        var member = message.mentions.members.first();
        if (member.activity.name.toLowerCase() == "league of legends") 
        member.kick(reason='jogando lol fdp').then((member) => {
            message.channel.send("mais um lixo sendo banido");
        })
        
    }
}

module.exports = { handleDotCall }
