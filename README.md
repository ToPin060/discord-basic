# Discord Basic App

This is a simple template, for a basic discord application.

## Usage

### Install

Clone the repository and use following commands
```bash
npm install
```
### Set-up environment

After downloading the repository, create a ".venv" file in the root folder, and copy the template below
```bash
# MANDATORY
DISCORD_TOKEN="YOUR_APPLICATION_TOKEN"

# OPTIONAL
GUILD_ID="YOUR_DISCORD_ID"
CLIENT_ID="YOUR_APPLICATION_ID"
```
> [How to Get a Discord Bot Token](https://www.writebots.com/discord-bot-token/)

### Usage

Some npm scripts are defined in "package.json" but the two most important are :
 - "deploy" to deploy the commands
 - "start" to launch the application.

As in the following example.
```bash
npm run deploy
npm run start
```

## Comment

You have a few examples in "src/events" and src/commands". You can improve and create new behaviours with this basic application.

Don't hesitate to let us know about any problems you encounter.

Have fun!