//@ts-nocheck
const { ToggleScript } = require("../../lib/ohts-Lib");

//ToggleScript("FullAutoFireworkCraft",async()=>{
    //baritone detect
    if(!Client.getMod("baritone")){
        Chat.log(Chat.createTextBuilder()
        .append("baritone")
        .withClickEvent("open_url","https://github.com/cabaletta/baritone/releases")
        .withFormatting(true,false,false,false,false)
        .append(" was not detected disabled")
        .withColor(255,255,255)
        .build())
    }

    Client.waitTick(1)

    //use baritone API 
    // code inspired by https://github.com/thojo0/jsmacro-btscreen/blob/7f1469e4083f49eb96919af8deaba149dcac4aec/Service.js#L39
    const baritone = Java.type("baritone.api.BaritoneAPI")
    .getProvider()
    .getPrimaryBaritone();
    const BaritoneCMD = baritone.getCommandManager().execute;

    BaritoneCMD("goto gold_block")

//})