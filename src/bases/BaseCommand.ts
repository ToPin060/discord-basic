
import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";


export default abstract class BaseCommand {
    private readonly __data: SlashCommandBuilder;


    constructor(slashCommandBuilder: SlashCommandBuilder) {
        this.__data = slashCommandBuilder;
    };


    public abstract execute(interaction: CommandInteraction<CacheType>): Promise<void>;
    
    public get data(): SlashCommandBuilder {
        return this.__data;
    };
};
