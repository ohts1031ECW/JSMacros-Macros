//@ts-nocheck

JsMacros.on("OpenContainer",JavaWrapper.methodToJava(()=>{
    Chat.log("opencontainer")
    Hud.getOpenScreen().addLine(0,0,Hud.getOpenScreen().getWidth(),Hud.getOpenScreen().getHeight(),0x000000)
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
