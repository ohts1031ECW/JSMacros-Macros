//@ts-nocheck

JsMacros.on("OpenContainer", JavaWrapper.methodToJava(() => {
    Chat.log("opencontainer")
    const Inventory = Player.openInventory()
    let shulker_box_name = [];
    for(let count = 0; count<27;count++){
        shulker_box_name.push(Inventory.getSlot(count).getName().getString())
        Chat.log(Inventory.getSlot(count).getDefaultName())
    }
    
    Chat.log(shulker_box_name);
    Utils.copyToClipboard(shulker_box_name.toString())
}))

/*
const scanner = World.getWorldScanner()
.withBlockFilter("getId").contains("chest")
.build()
const rawdate = scanner.scanAroundPlayer(5).toString();
const array = rawdate.replace(/[|]/g,"").split(",")

Chat.log(rawdate);
Chat.log(typeof rawdate)
Chat.log(array)
Chat.log(typeof array)
//let out = [];
for(const index in rawdate.length){
    Chat.log(`index: ${index}`);
    Chat.log(`item: ${rawdate[index]}`)
}
/*
.withBlockFilter("getHardness").is("<=", 10)
.andStringBlockFilter().contains("chest", "barrel")
.withStringStateFilter().contains("facing=south")
.andStateFilter("isToolRequired").is(false)
.build()
*/
//Chat.log(out)
