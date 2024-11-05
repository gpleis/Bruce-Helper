import { GuildMember } from "discord.js";

export function checkUserIsInVoiceChannel(member: GuildMember): boolean {
  return Boolean(member?.voice.channel);
}