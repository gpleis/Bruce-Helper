import { Client, VoiceChannel, ChannelType } from 'discord.js';
import { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, DiscordGatewayAdapterCreator } from '@discordjs/voice';
import path from 'path';

export async function playGongo(client: Client) {
  console.log("GONGO!");

  // Filtra os canais de voz que contém "refugo" no nome e possuem membros conectados
  const refugoChannels = client.channels.cache.filter(channel => {
    if (channel.type === ChannelType.GuildVoice && channel.members.size > 0 && channel.name.toLowerCase().includes("refugo")) {
      return channel;
    }
  }) as Map<string, VoiceChannel>;

  if (refugoChannels.size > 0) {
    // Seleciona o canal com mais membros
    const refugoFinal = Array.from(refugoChannels.values())
      .sort((a, b) => b.members.size - a.members.size)[0] as VoiceChannel;

    if (refugoFinal) {
      // Move os membros para o canal final
      refugoChannels.forEach(channel => {
        if (channel.id === refugoFinal.id) return;

        channel.members.forEach(member => {
          member.voice.setChannel(refugoFinal);
        });
      });

      // Conecta ao canal de voz e toca o áudio
      const voiceConnection = joinVoiceChannel({
        channelId: refugoFinal.id,
        guildId: refugoFinal.guild.id,
        adapterCreator: refugoFinal.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
      });

      const resource = createAudioResource(path.join(__dirname, '../assets/bigben.mp3'));
      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play,
        },
      });

      voiceConnection.on(VoiceConnectionStatus.Ready, () => {
        voiceConnection.subscribe(player);
        player.play(resource);
      });

      player.on(AudioPlayerStatus.Idle, () => {
        voiceConnection.destroy();
      });
    }
  }
}