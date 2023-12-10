
import path from "path";
import fs from "fs";
import "dotenv/config";

import {
    REST,
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIApplicationGuildCommandsJSONBody,
    RESTPutAPIApplicationCommandsJSONBody,
    RESTPutAPIApplicationGuildCommandsJSONBody,
    Routes
} from "discord.js";

import logger from "../core/ExtendLogger.js";
import BaseCommand from "../bases/BaseCommand.js";
import { SRC_PATH, dynamicImport } from "../utilities/utils.js";


/**
 *  Note:
 *      This script extract/store all the commands and deploy it for usage.
 */
const clientId: string = process.env.CLIENT_ID;
const guildId: string = process.env.GUILD_ID;

const commandsPath: string = path.join(SRC_PATH, "/commands");
const commandsFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands: RESTPostAPIApplicationCommandsJSONBody[] | RESTPostAPIApplicationGuildCommandsJSONBody[] = [];
for (const file of commandsFiles) {
	const filePath: string = path.join(commandsPath, file);
	const command: BaseCommand = await dynamicImport(filePath) as BaseCommand;

    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        logger.warn(`The command at ${filePath} is missing a required "data" and "execute" properties.`);
    };
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

logger.logHeader("DEPLOY");

try {
    logger.info("Clearing application commands cache...");
    rest.put(Routes.applicationCommands(clientId), { body: [] });

    logger.info("Application commands cache cleared.");

    logger.info("");
    logger.info(`Adding ${commands.length} application commands...`);

    if (guildId) {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        ) as RESTPutAPIApplicationGuildCommandsJSONBody[];
    } else {
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        ) as RESTPutAPIApplicationCommandsJSONBody[];
    };

    logger.info("Application commands added.");
} catch (error) {
    logger.error(error);
};
