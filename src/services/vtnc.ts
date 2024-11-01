import { Client, Message, TextChannel } from "discord.js";

export function handleVtnc(client: Client, message: Message) {
  const vtncCases = [
    "va tomar no cu",
    "vai tomar no cu",
    "vtnc",
    "tnc",
    "tomar no cu",
    "vai toma no cu",
    "tomar nesse cu",
    "vai tomar nesse seu cu",
    "va tomar no cu va",
    "tomar no cu va",
    "tome no cu",
    "tome nesse cu",
    "tome no cu va",
    "tome nesse seu cu",
    "tome nesse seu cu va",
    "toma lá no teu cu",
    "tome lá no teu cu"
  ];

  if (vtncCases.some((vtncCase) => message.content.toLowerCase().includes(vtncCase))) {
    const channel = client.channels.cache.get(message.channelId) as TextChannel;
    const vtnc = Math.floor(Math.random() * 10 + 1);

    switch (vtnc) {
      case 1:
        channel.send("tomate cru é vitamina, como tu e tua prima");
        break;
      case 2:
        channel.send(
          `ih ala o nome do cara é ${message.author}kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`,
        );
        break;
      case 3:
        channel.send("vai comer tua bunda");
        break;
      case 4:
        channel.send("sim");
        break;
      case 5:
        channel.send(
          "tá engraçado hoje em seu filho duma puta, tá com o patati patatá enfiado no teu cu é",
        );
        break;
      case 6:
        channel.send("n");
        break;
      case 7:
        channel.send("seu cu");
        break;
      case 8:
        channel.send("ok");
        break;
      case 9:
        channel.send("fodase");
        break;
      case 10:
        channel.send("gg gay");
        break;
      case 11:
        channel.send("cala a boca que vc tb eh um bot arrombado do carai");
    }
  }
}
