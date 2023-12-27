const { ToggleScript } = require("../../lib/ohts-Lib");

ToggleScript("inventoryinfo-dev",async()=>{
    //Iscreen
    const X = 100;
    const Y = 100;
    
    Client.waitTick(10);
    if(Hud.isContainer() === true){
        //アイテム取得
        //const contained_Item = Player.openInventory().getItems();

        const Screen = Hud.getOpenScreen();///とりあえず仮で中に何が入ってるか
        const ScreenName = Hud.getOpenScreenName();

        Chat.log(`ScreenName: ${ScreenName}`);

        //note white = 0xffffff
        //Chat.log(`get title text: ${Screen?.getTitleText()}`);
        //Screen?.textFieldBuilder().createWidget().setText("TEEEEEEEEEEEEExt").setActive(true)//.setPos(100,100);
        Screen?.addText("めっちゃ明るくなったわ",X,Y,0xffffff,true);
        //アイテム取得どうしましょ

    
    }
})