//@ts-nocheck
Chat.log("FireWork Check service started");

const OpenContainer = JsMacros.on("OpenContainer",JavaWrapper.methodToJava((container)=>{
    const Inventory = container.inventory;

    //large chest
    if(Inventory.getTotalSlots() === 90){
        Chat.log("large chest");
        for(let count = 0 ;count<54;count++){

            //if shulkerbox
            if(Inventory.getSlot(count).getDefaultName().getString().includes("Shulker Box")){
                const ShulkerItem = Inventory.getSlot(count).getNBT().get("BlockEntityTag").asCompoundHelper().get("Items").asListHelper()
                Chat.log(Inventory.getSlot(count).getNBT().get("BlockEntityTag").asCompoundHelper().getKeys())
                let Shulker_In_Items =[]
                for(let count = 0;count<ShulkerItem.length();count++){
                    const Item =ShulkerItem.get(count).asCompoundHelper()
                    Chat.log(Item.get("id").asString())
                    Chat.log(Item.get("Slot"))
                }
            }
        }

        //chest
    } else if(Inventory.getTotalSlots() === 63){
        Chat.log("chest")
    }
}))

event.stopListener = JavaWrapper.methodToJava(() => {
    JsMacros.off(OpenContainer);
    Chat.log("service stopped");
});