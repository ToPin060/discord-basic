
import { ClientEvents } from "discord.js";


export default abstract class BaseEvent<Key extends keyof ClientEvents> {
    public readonly __name: Key;
    public readonly __once: boolean;


    constructor(name: Key, once: boolean) {
        this.__name = name;
        this.__once = once;
    };

    
    public abstract execute(...args: ClientEvents[Key]): any;

    public get name(): Key {
        return this.__name;
    };
    public get once(): boolean {
        return this.__once;
    };
};
