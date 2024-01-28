// @ts-nocheck
const { ToggleScript } = require("../../lib/ohts-Lib");

ToggleScript("inventoryinfo-dev", async () => {


    Client.waitTick(1);
    if (Hud.isContainer() === true) {

        //アイテム取得
        const playerinv = Player.openInventory()

        const Screen = Hud.getOpenScreen();///とりあえず仮で中に何が入ってるか
        const ScreenName = Hud.getOpenScreenName();

        //Iscreen
        const coords = {
            chest: {
                X: Math.round(Screen.getWidth() / 2) - 75,
                Y: 10
            },
            shulker_left: {
                X: 5,
                Y: 5,
            },
            shulker_right: {
                X: 700,
                Y: 5
            }
        }
        //Chat.log(`ScreenName: ${ScreenName}`)

        let container_hight;
        if (ScreenName === "3 Row Chest" || ScreenName === "Shulker Box") {
            container_hight = 3;
        } else if (ScreenName === "6 Row Chest") {
            container_hight = 6
        }
        ItemPlot(coords);


        //アイテム配置
        function ItemPlot(coords) {
            //シュルカーボックス個数カウント
            let shulkercount = 0;
            let Lines = 0;//描画の列カウント
            for (let countY = 0; countY < container_hight; countY++) {
                for (let countX = 0; countX <= 8; countX++) {
                    const Slot = countX + countY * 9
                    const Itemdata = playerinv.getSlot(Slot);

                    //アイテム配置
                    Screen?.addItem(coords.chest.X + (15 * countX), coords.chest.Y + 10 + (23 * countY), Itemdata.getItemId());

                    //アイテムに重ねてアイテムの個数表示(1の場合は表示なし)
                    if (Itemdata.getCount() > 1) {
                        Screen.addText(Itemdata.getCount().toString(), coords.chest.X + (15 * countX), coords.chest.Y + 8 + (23 * countY), 0xffffff, true).setScale(0.65);
                    }


                    //シュルカーボックスなら
                    //シュルカーボックスないアイテム主六処理
                    if (playerinv.getSlot(Slot).getItemId() === "minecraft:shulker_box") {


                        //シュルカーのNBTから中に入ってるアイテムを取得
                        const shulkerNBT = playerinv.getSlot(Slot).getNBT().get("BlockEntityTag").get("Items").asListHelper();
                        //const shulkerNBT = playerinv.getSlot(Slot).getNBT().get("BlockEntityTag").get("Items").asListHelper();




                        for (let count = 0; count < shulkerNBT.length(); count++) {
                            const ItemNBTData = shulkerNBT.get(count).asCompoundHelper();

                            const ItemCount = ItemNBTData.get("Count").asString().replace(/b/g, "");
                            if (count <= 8) {
                                Screen.addText(ItemCount, coords.shulker_left.X + (120 * Lines) + (15 * count) - 1, coords.shulker_left.Y + (shulkercount * 75) - 1, 0xffffff, false).setScale(0.6);//アイテムの個数追加
                                Screen.addItem(coords.shulker_left.X + (120 * Lines) + (15 * count), coords.shulker_left.Y + (shulkercount * 75) + 5, ItemNBTData.get("id").asString());//アイテム追加
                            } else if (count >= 9 && count <= 17) {
                                Screen.addText(ItemCount, coords.shulker_left.X + (120 * Lines) + (15 * (count - 9)) - 1, coords.shulker_left.Y + (shulkercount * 75) - 1 + 24, 0xffffff, false).setScale(0.6);//アイテムの個数追加
                                Screen.addItem(coords.shulker_left.X + (120 * Lines) + (15 * (count - 9)), coords.shulker_left.Y + (shulkercount * 75) + 5 + 24, ItemNBTData.get("id").asString());//アイテム追加
                            } else {
                                Screen.addText(ItemCount, coords.shulker_left.X + (120 * Lines) + (15 * (count - 18)) - 1, coords.shulker_left.Y + (shulkercount * 75) - 1 + 48, 0xffffff, false).setScale(0.6);//アイテムの個数追加
                                Screen.addItem(coords.shulker_left.X + (120 * Lines) + (15 * (count - 18)), coords.shulker_left.Y + (shulkercount * 75) + 5 + 48, ItemNBTData.get("id").asString());//アイテム追加
                            }
                        }

                        //↑ここまで
                        //枠描画
                        //Screen.addLine(coords.shulker_left.X, coords.shulker_left.Y, coords.shulker_left.X + 120, shulker_left.Y, 0xffffff);
                        if (shulkercount % 8 === 0) {
                            Chat.log(shulkercount)
                            Chat.log("Lines")
                            Lines++
                        }
                        shulkercount++
                    }
                }
            }
        }

        //コンテナ内のアイテムの変化時の処理
        JsMacros.once("ClickSlot", JavaWrapper.methodToJava(() => {

            //スクリーンのすべてのelementを取得し削除
            for (const element of Screen.getElements().toArray()) {
                Screen.removeElement(element)
            }

            //再描画
            ItemPlot(coords);
        }))
    }
})