
import { CacheType, CommandInteraction, inlineCode, SlashCommandBuilder } from "discord.js";

import Command from "../bases/BaseCommand.js";


class PingCommand extends Command {
    public constructor() {
        super(
            new SlashCommandBuilder()
            .setName("ping")
            .setDescription(`Replies with "Pong!" and give a ping check`) as SlashCommandBuilder
        );
    }


    public override async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        interaction
        .reply({
            content:"Processing...",
            fetchReply:true
        })
        .then((msg) => {
            setTimeout(() => {
                let ping = msg.createdTimestamp - interaction.createdTimestamp;
                interaction.editReply({
                    content: `Pong! Latency is ${inlineCode(`${ping}ms`)}.\nAPI Latency is ${inlineCode(`${interaction.client.ws.ping}ms`)}`
                });
            })
        });
    };
};


export default new PingCommand();
