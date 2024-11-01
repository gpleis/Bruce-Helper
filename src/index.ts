import {
  Client,
  GatewayIntentBits,
  Events,
  TextChannel,
  VoiceChannel,
  ChannelType,
} from "discord.js";
import {
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  getVoiceConnection,
  joinVoiceChannel,
  NoSubscriberBehavior,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { BOT_TOKEN } from "./config/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const cron = require("node-cron");
const task = cron.schedule("0 0 */1 * * *", async () => {
  //colocar o dingdong aqui
});

client.once(Events.ClientReady, async (client) => {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
  
  const uoltipapo = client.channels.cache.get(
    "582999750308134916",
  ) as TextChannel;

  const readyMessages = [
    "OFICIALMENTE ONLINE E METENDO",
    "TIREM AS MULHERES E CRIANÇAS DA FRENTE, BRUCE METE CHEGOU",
    "Bom dia! Vamos meter!",
    "Ohayo domo arigato gozaimasu! Ore wa BURUCE SEX HERUPER!",
    "Iniciando protocolo GPLAYS",
    // write 5 more messages under leading the line from those above
  ]

  const messagePicker = Math.floor(Math.random() * readyMessages.length)

  uoltipapo?.send(readyMessages[messagePicker]);

  //pega o refugo
  // const channel = client.channels.cache.get(
  //   "1300271303324074005",
  // ) as VoiceChannel;

  //pega p refugo habitado

  const refugoChannels = client.channels.cache.filter((channel) => {
    const voiceChannel = channel;
    if(voiceChannel.type === ChannelType.GuildVoice 
      && voiceChannel.members.size > 0 
      && voiceChannel.name.toLowerCase().includes("refugo")) {
      console.log(`achei a call boa ${voiceChannel.name}`)
      return voiceChannel;
    }
  });


  if (refugoChannels.size > 0) {
    const refugoFinal: VoiceChannel = refugoChannels.sort((a, b) => {
      const voiceChannelA = a as VoiceChannel;
      const voiceChannelB = b as VoiceChannel;
      return voiceChannelB.members.size - voiceChannelA.members.size;
  
    }).first() as VoiceChannel;
    
    await refugoChannels.forEach((channel) => {
      if(channel.id === refugoFinal.id) return;
      const voiceChannel = channel as VoiceChannel;
      const members = voiceChannel.members;
      members.forEach((member) => {
        member.voice.setChannel(refugoFinal);
      });

    });
    
    // aqui ele cria a conexao tarr?
    const voiceConnection = joinVoiceChannel({
      channelId: refugoFinal.id,
      guildId: refugoFinal.guild.id,
      adapterCreator: refugoFinal.guild
        .voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });

    //pega o dingdong nos assest
    const resource = createAudioResource(__dirname + "/assets/bigben2.mp3");

    //cria o player
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });

    //testa se a conexao ta pronta
    voiceConnection.on(VoiceConnectionStatus.Ready, () => {
      console.log("Voice connection is ready!");
      //poe o ouvido na boca no player e repete ele
      voiceConnection.subscribe(player);
      //toca o sino pequenino
      player.play(resource);
    });
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const randInt = Math.floor(Math.random() * 5)

  console.log(message.content, message.content.toLowerCase().includes("civic"));

  if (message.content.toLowerCase().includes("civic"))
    await message.channel.send("Você disse...");
  
    for (let i = 0; i < randInt; i++) {
      await message.channel.send("Civic?");
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

task.start();
client.login(BOT_TOKEN);
