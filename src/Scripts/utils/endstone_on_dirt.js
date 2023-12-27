// @ts-nocheck
const { ToggleScript, getTargetedBlock } = require("../../lib/ohts-Lib");

ToggleScript("endstone on dirt",async()=>{
    Client.waitTick(1)

    if( getTargetedBlock()?.getId() == "minecraft:end_stone"){

        const playerinv =Player.openInventory();
        const dirt_grass = playerinv.findItem("minecraft:dirt").concat(playerinv.findItem("minecraft:grass_block"))
        const selectedhotbarindex = 36+playerinv.getSelectedHotbarSlotIndex();
        if(playerinv.getSlot(selectedhotbarindex).getItemId() === "minecraft:air"){
            playerinv.click(dirt_grass[0]);
            playerinv.click(selectedhotbarindex)
        }

        if(playerinv.getSlot(selectedhotbarindex).getItemId() === "minecraft:dirt" | playerinv.getSlot(selectedhotbarindex).getItemId() ===  "minecraft:grass_block"){
            Player.getInteractionManager()?.interact()
        }
        
    }
})