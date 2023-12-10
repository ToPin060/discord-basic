
import path from "path";
import fs from "fs";
import "dotenv/config";

import { Client, ClientEvents, Collection, GatewayIntentBits } from "discord.js";

import { SRC_PATH, dynamicImport } from "../utilities/utils.js";
import logger from "./ExtendLogger.js";

import BaseEvent from "../bases/BaseEvent.js";
import BaseCommand from "../bases/BaseCommand.js";


/**
 *  Note:
 *      This class is an extension of the Client form discord.js.
 *      Official Client class documentation: https://discord.js.org/docs/packages/discord.js/14.14.1/Client:Class.
 * 
 *      ExtendClient permit to load and/or set all events and commands.
 *      Commands are also stored in a Collection.
 *      
 *  ExtendedClient is a singleton.
 */
export class ExtendedClient extends Client {
    private readonly __commands: Collection<string, BaseCommand> = new Collection<string, BaseCommand>();


    private constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions
            ]
        });

        this.loadEvents();
        this.loadCommands();
    };

    
    public override login(token?: string): Promise<string> {
        logger.logHeader("LAUNCH");
        return super.login(token);
    }

    private async loadEvents(): Promise<void> {
        const eventsPath: string = path.join(SRC_PATH, "events");
        const eventsFiles: string[] = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

        for (const file of eventsFiles) {
            const filePath: string = path.join(eventsPath, file);
            const event: BaseEvent<keyof ClientEvents> = await dynamicImport(filePath) as BaseEvent<keyof ClientEvents>;
            
            if ("name" in event && "execute" in event) {
                if (event.once) {
                    this.once(event.name, (...args) => event.execute(...args));
                } else {
                    this.on(event.name, (...args) => event.execute(...args));
                }
            } else {
                logger.warn(`The event at ${filePath} is missing a required "name" or/and "execute" properties.`);
            }
        }
    };
    private async loadCommands(): Promise<void> {
        const commandsPath: string = path.join(SRC_PATH, "commands");
        const commandsFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

        for (const file of commandsFiles) {
            const filePath: string = path.join(commandsPath, file);
            const command: BaseCommand = await dynamicImport(filePath) as BaseCommand;
        
            if ("data" in command && "execute" in command) {
                this.__commands.set(command.data.name, command)
            } else {
                logger.warn(`The command at ${filePath} is missing a required "data" or/and "execute" properties.`);
            };
        }
    };
 
    public getCommands(): Collection<string, BaseCommand> {
        return this.__commands;
    };

    /**
     * Singleton properties
     */
    private static __instance: ExtendedClient;
    public static get instance(): ExtendedClient {
        if (!this.__instance) {
            this.__instance = new ExtendedClient()
        }
        return this.__instance;
    }
};

const client = ExtendedClient.instance;
export default client;
