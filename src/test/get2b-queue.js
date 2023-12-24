const {ToggleScript}= require("../ohts-Lib.js")

//togglescript

//ToggleScript("TEST",async()=>{



    Client.waitTick(20);
    //get chathistory
    const chathistory = Chat.getHistory().getRecvLines()[0].getText().getString();
    
    const queuecount = chathistory.split(":")[1].split(" ")[1].split("\n")[0]
    
    Chat.log(`queue ${queuecount}`);  

//})


