//@ts-nocheck
const { ToggleScript } = require("./ohts-Lib");

ToggleScript("scaffold",async()=>{
    Client.waitTick(10);

    //get player coords
    const playerX = Player.getPlayer().getX();
    const playerY = Player.getPlayer().getY();
    const playerZ = Player.getPlayer().getZ();

    Chat.log(`X: ${playerX}, Y: ${playerY}, Z: ${playerZ}`);

    const inv = Player.openInventory();

    const defaultyaw = Player.getPlayer().getYaw();
    const defaultpitch = Player.getPlayer().getPitch()

    const playerinteraction = Player.getInteractionManager();

    playerinteraction.interactBlock(playerX,playerY-1,playerZ,"down",false)


})