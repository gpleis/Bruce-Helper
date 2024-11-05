import { GuildMember } from "discord.js";

export async function muteUser(member: GuildMember): Promise<void> {
  await member.voice.setMute(true);
}