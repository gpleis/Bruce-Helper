import { AttachmentBuilder, Client, EmbedBuilder, Message, TextChannel } from "discord.js";

export function handleDotCall(client: Client, message: Message) {
  const textChannel = client.channels.cache.get(message.channelId) as TextChannel

  if (!textChannel || !client) return;
  
  if (message.content.toLowerCase() === ".comandos") {
    message.reply(
      'Lembrando que o prefixo é "." \n *kick* \n *ping* \n *gay* \n *pombão* \n *avatar* \n *pombão* \n *sn* (Decidir se sim ou não) \n *sorteio* \n O comando "é gay" é utilizado marcando e digitando "é gay" no final. \n Obviamente nem todos os comandos estão prontos, então vai reclamar na casa de cacete. \nE EU AINDA DIGO MAIS, APROVEITE ENQUANTO ESSA MERDA FUNCIONA PORQUE ELA SERA TROCADA, Seu bosta.',
    );
  } else if (message.content.toLowerCase() === ".play sunflower") {
    textChannel.send(`-play ${message.content.split(" ")[1]}`);
  } else if (
    message.content.toLowerCase() ===
    `.kick <@${client.user?.id}>`
  ) {
    //kick
    
    const user = message.mentions.users.first();
    console.log(user)
    if (user) {
      const otario = message.member;

      console.log(otario)
      
      if (otario) {
        otario
          .timeout(10000, "Kicka a mãe")
          .then(() => {
            message.reply(
              `O otário do ${otario?.displayName} tentou me kickar e SE DEU MAL`,
            );
          })
          .catch((err: any) => {
            message.reply(
              `ALGUÉM ME AJUDA, o ${otario} tá tentando me kickar e eu não consigo me vingar`,
            );
            console.error(err);
          });
      }
    } else {
      message.reply("Deu erro man.");
    }
  } else if (message.content === ".ping") {
    //ping
    textChannel.send("PONG.");
  } else if (message.content.toLowerCase() === ".gay") {
    //gay
    textChannel.send(`Gay mesmo só ${message.author}.`);
  } else if (message.content.toLowerCase() === ".pombão") {
    //pombao
    textChannel.send(`Pomba grande só não é de ${message.author}!`);
  } else if (message.content.toLowerCase() === ".avatar") {
    //avatar
    textChannel.send(`Seu avatar é ${message.author.displayAvatarURL()}`);
  } else if (message.content.toLowerCase() === ".embed") {
    //embed
    const embedMessage = new EmbedBuilder()
      .setTitle("Sei não man")
      .setColor(0xff0000)
      .setDescription("Maan, sei não");

    textChannel.send({ embeds: [embedMessage] });
  } else if (message.content.startsWith(".play")) {
    //play
    const willsmith = new AttachmentBuilder("https://imgur.com/itxe78j.png");
    textChannel.send({ files: [willsmith] });
  } else if (message.content.toLowerCase() === ".sn") {
    //sn
    const sn = Math.floor(Math.random() * 10 + 1);
    if (sn % 2 == 0) {
      message.reply("Sim.");
    } else {
      message.reply("Não.");
    }
  } else if (message.content.toLowerCase() === ".sorteio") {
    //sorteio
    const sorteio = Math.floor(Math.random() * 10 + 1);
    message.reply(sorteio.toString());
  } 
  // else if (message.content.includes() === `.lol`) {
  //   var member = message.mentions.members.first();
  //   if (member.activity.name.toLowerCase() == "league of legends")
  //     member.kick((reason = "jogando lol fdp")).then((member) => {
  //       message.channel.send("mais um lixo sendo banido");
  //     });
  // }
}


type Handler = (client: Client, message: Message) => Promise<void>;

const commandHandlers: { [key: string]: Handler } = {
    ping: async (client, message) => {
        await message.reply('Pong!');
    },
    hello: async (client, message) => {
        await message.reply('Hello there!');
    }
};

async function handleDotCallMinified(client: Client, message: Message) {
    const command = message.content.slice(1).trim().split(' ')[0];

    const handler = commandHandlers[command];
    if (handler) {
        await handler(client, message);
    } else {
        await message.reply(`Unknown command: ${command}`);
    }
}