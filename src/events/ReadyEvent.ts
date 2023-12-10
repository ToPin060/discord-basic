
import { Client, Events } from "discord.js";

import logger from "../core/ExtendLogger.js";

import BaseEvent from "../bases/BaseEvent.js";


class ReadyEvent extends BaseEvent<Events.ClientReady> {
    public constructor() {
        super(Events.ClientReady, true);
    };

    
    public override execute(client: Client) {
        logger.info(`${client.user.username} is online`);
    };
};

export default new ReadyEvent();
