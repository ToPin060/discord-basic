
import { CacheType, Events, Interaction} from "discord.js";

import logger from "../core/ExtendLogger.js";
import client from "../core/ExtendClient.js";

import BaseEvent from "../bases/BaseEvent.js";
import BaseCommand from "../bases/BaseCommand.js";


class InteractionCreateEvent extends BaseEvent<Events.InteractionCreate> {
    public constructor() {
        super(Events.InteractionCreate, false);
    };
    
    
    public override async execute(interaction: Interaction<CacheType>) {
        if (!interaction.isCommand()) return;
        
        const command: BaseCommand = client.getCommands().get(interaction.commandName);

        try {
            command.execute(interaction);
        } catch (error) {
            await interaction.reply({
                content: `There was an error while executing this command: \n${error.message} \nCheck the console for more info.`,
                ephemeral: true
            });
            logger.error(`Error executing ${interaction.commandName}`);
            logger.error(error?.stack);
        }
    };
};


export default new InteractionCreateEvent();
