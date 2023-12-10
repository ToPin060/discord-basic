
import "dotenv/config";

import client from "../core/ExtendClient.js";


/**
 *  Note:
 *      This script launch the Discord client.
 */
client.login(process.env.DISCORD_TOKEN);
