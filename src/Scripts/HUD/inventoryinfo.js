// @ts-nocheck
const { ToggleScript } = require("../../lib/ohts-Lib");

ToggleScript("inventoryinfo-dev", async () => {
    //Iscreen
    const X = 0;
    const Y = 0;

    Client.waitTick(10);
    if (Hud.isContainer() === true) {

        //アイテム取得
        const playerinv = Player.openInventory()

        const Screen = Hud.getOpenScreen();///とりあえず仮で中に何が入ってるか
        const ScreenName = Hud.getOpenScreenName();

        Chat.log(`ScreenName: ${ScreenName}`)

        let container_hight;
        if (ScreenName === "3 Row Chest" || ScreenName === "Shulker Box") {
            container_hight = 3;
        } else if (ScreenName === "6 Row Chest") {
            container_hight = 6
        }
        ItemPlot(X, Y);


        //アイテム配置
        function ItemPlot(X, Y) {
            for (let countY = 0; countY < container_hight; countY++) {
                for (let countX = 0; countX <= 8; countX++) {
                    const Slot = countX + countY * 9
                    const Itemdata = playerinv.getSlot(Slot);


                    /*
                    Chat.log(`countX: ${countX + 1} countY: ${countY} Slot:${Slot}`);
                    Chat.log(Itemdata.getItemId())
                    Chat.log(Itemdata.getCount())
                    */

                    //アイテム配置
                    Screen?.addItem(X + 15 + (15 * countX), Y + 15 + (25 * countY), Itemdata.getItemId());

                    //アイテムに重ねてアイテムの個数表示(1の場合は表示なし)
                    if (Itemdata.getCount() > 1) {
                        Screen.addText(Itemdata.getCount().toString(), X + 15 + (15 * countX), Y + 12 + (25 * countY), 0xffffff, true).setScale(0.65);
                    }
                }
            }
        }


        //コンテナ内のアイテムの変化時の処理
        JsMacros.on("ClickSlot",JavaWrapper.methodToJava(()=>{
            Chat.log("click slot event")
            for(const element of Screen.getElements().toArray()){
                Screen.removeElement(element)
            }
            ItemPlot(X,Y);
        }))
    }
})