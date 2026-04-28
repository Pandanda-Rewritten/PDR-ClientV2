const RPC = require('discord-rpc');
const rpcClient = new RPC.Client({ transport: 'ipc' });
const APPLICATION_ID = '1375838864140144660';
RPC.register(APPLICATION_ID);

let isConnected = false;

function onRpcReady() {
    rpcClient.setActivity({
        state: "Helping other Pandas",
        details: "Adventuring around and",
        startTimestamp: Date.now(),
        largeImageKey: "pdrapp",
        instance: true,
    });
}

const initDiscordRichPresence = async () => {
    rpcClient.on('ready', onRpcReady);
    try {
        await rpcClient.login({
            clientId: APPLICATION_ID
        });
    } catch (error) {
        console.error('Error connecting to Discord RPC:', error);
        return;
    }
    isConnected = true;
}

async function cleanupDiscord() {
    if (isConnected && rpcClient) {
        try {
            await rpcClient.clearActivity();
            await rpcClient.destroy();
        } catch (error) {
            console.error('Error cleaning up Discord RPC:', error);
        }
    }
}

module.exports = { initDiscordRichPresence, cleanupDiscord }