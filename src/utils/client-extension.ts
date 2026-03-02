// import { Client, Collection, CommandInteraction, type ClientOptions } from "discord.js";

import type { Collection } from "discord.js";

// export default class BotClient extends Client {
//     commands: Collection<string, (interaction: CommandInteraction) => Promise<void>>;
    
//     constructor(options: ClientOptions) {
//         super(options);
//         this.commands = new Collection();
//     }
// }

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, (interaction: CommandInteraction) => Promise<void>>;
    }
}