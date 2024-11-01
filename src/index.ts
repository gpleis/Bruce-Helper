import {
  Client,
  GatewayIntentBits,
  Events,
  TextChannel,
  VoiceChannel,
  ChannelType,
  ActivityType,
} from "discord.js";
import {
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  NoSubscriberBehavior,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { BOT_TOKEN } from "./config/config";
import cron from "node-cron";
import { handleBotInteraction } from "./services/botInteraction";
import { handleDotCall } from "./services/dotCall";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const task = cron.schedule("0 0,12 * * *", async () => {
  client.emit("gongo", client)
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

  client.user.setActivity("com a mãe de vocês", {
    type: ActivityType.Playing,
  });
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("nao gosto") && message.content.toLowerCase().includes("civic")) {
    const member = message.member;
    member?.voice.setMute(true);
  }
  else if (message.content.toLowerCase().includes("civic")) { 
    await message.channel.send("Você disse...");
    const randInt = Math.floor(Math.random() * 5)

    for (let i = 0; i < randInt; i++) {
      await message.channel.send("Civic?");
    }
  }

  if (message.content.startsWith(".")) {{
    await handleDotCall(message, client)
  }} 
  else if (message.content.includes("bot")) {
    await handleBotInteraction(client, message);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.on("gongo", async (client) => {
  console.log("GONGO!");
  
  const refugoChannels = client.channels.cache.filter((channel: VoiceChannel) => {
    const voiceChannel = channel;

    if (
        voiceChannel.type === ChannelType.GuildVoice && 
        voiceChannel.members.size > 0 && 
        voiceChannel.name.toLowerCase().includes("refugo")
      ) {
      return voiceChannel;
    }
  });

  if (refugoChannels.size > 0) {
    const refugoFinal: VoiceChannel = refugoChannels.sort((a: VoiceChannel, b: VoiceChannel) => {
      const voiceChannelA = a;
      const voiceChannelB = b;
      return voiceChannelB.members.size - voiceChannelA.members.size;
  
    }).first() as VoiceChannel;

    if (refugoFinal) {
      await refugoChannels.forEach((channel: VoiceChannel) => {
        if(channel.id === refugoFinal.id) return;

        const voiceChannel = channel as VoiceChannel;
        const members = voiceChannel.members;

        members.forEach((member) => {
          member.voice.setChannel(refugoFinal);
        });

      });
      
      const voiceConnection = joinVoiceChannel({
        channelId: refugoFinal.id,
        guildId: refugoFinal.guild.id,
        adapterCreator: refugoFinal.guild
          .voiceAdapterCreator as DiscordGatewayAdapterCreator,
      });

      const resource = createAudioResource(__dirname + "/assets/bigben.mp3");

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play,
        },
      });

      await voiceConnection.on(VoiceConnectionStatus.Ready, () => {
        console.log("Voice connection is ready!");
        voiceConnection.subscribe(player);
        player.play(resource);
      });

      player.on("stateChange", (oldState, newState) => {
        if (newState.status === "idle") {
          voiceConnection.destroy()
          return
        }
        
        console.log(
          `Audio player transitioned from ${oldState.status} to ${newState.status}`
        );
      })
    }
  }
})

task.start();
client.login(BOT_TOKEN);
