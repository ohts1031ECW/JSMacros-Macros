//@ts-nocheck
//rusher commands
//please input a command to change the settings by command
const OverWorld = "*elytrafly acceleration.maxspeed 1.9";
const Nether_Diagonal = "*elytrafly acceleration.maxspeed 2.2";
const Nether_Straight = "*elytrafly acceleration.maxspeed 2.9"

const DimenstionEvent = JsMacros.on("DimensionChange",JavaWrapper.methodToJava((dimention)=>{
    Chat.log(dimention.dimension);
    switch(dimention.dimension){
        case "minecraft:overworld":{
            Chat.say(OverWorld);
            Chat.log("Autoswitched elytrafly setting to overworld");
            break;
        }
        case "minecraft:the_nether":{
            Chat.say(Nether_Diagonal);
            Chat.log("Autoswitched elytrafly setting to overworld");
            break;
        }
    }

}))

event.stopListener = JavaWrapper.methodToJava(()=>{
    Chat.log("Service Stopped");

    JsMacros.off(DimenstionEvent)
})