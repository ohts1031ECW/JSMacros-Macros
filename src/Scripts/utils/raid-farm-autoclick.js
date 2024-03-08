const { ToggleScript } = require("../../lib/ohts-Lib");

ToggleScript("autoclick",async()=>{
    Player.getPlayer().lookAt(0,90);
    Client.waitTick(30);
    Player.getInteractionManager()?.attack()
})