//@ts-nocheck


//ここから文字サイズ位置等微調整用
//描画の座標微調整用
//描画の位置がずれていた場合に数値(マイナスプラス)を入れて修正してください たぶん修正しないとほぼ確実にずれます
const coords = {
    chest: {
        X: -5,
        Y: 10
    },
    shulker_left: {
        X: 5,
        Y: 5,
    },
    shulker_right: {
        X: 700,
        Y: 5
    },
    Itemcount: {
        X: -2,
        Y: -2
    }
}
const ItemcountTextColor = 0xffffff;//16進数カラーコードで指定 カラーコード頭の#は0xに置き換えてください デフォルトは0xffffff の白です
const ItemCountScale = 0.65 //アイテム個数表示の文字の大きさを指定します デフォルトは0.65です
//ここまで

//引数 (coords)
function Container_Update(coords) {

    //個々れへんの変数群絶対もっと効率化できると思う
    const Inventory = Player.openInventory();//Inventory
    const Screen = Hud.getOpenScreen();//IScreen
    const ScreenName = Hud.getOpenScreenName();//ScreenName
    const ScreenHight_100 = Screen.getHeight() / 100;
    const ScreenWidth_100 = Screen.getWidth() / 100;
    const ItemXdistance = Math.floor(ScreenWidth_100 * 2);
    const ItemYdistance = Math.floor(ScreenHight_100 * 4);
    const Shulker_Line = Math.floor(Screen.getHeight() / 7);

    let container_hight
    if (ScreenName === "3 Row Chest" || ScreenName === "Shulker Box") {
        container_hight = 3;
    } else if (ScreenName === "6 Row Chest") {
        container_hight = 6;
    }

    //アイテム描画
    for (let countY = 0; countY < container_hight; countY++) {
        for (let countX = 0; countX < 9; countX++) {
            /*
            countX チェストの行で0~8の9スロット
            countY チェストの列で0~2 0~5までの3,6スロット
            足してx9でスロット番号0~26と0~53を生成する
            */
            const SlotNumber = countX + countY * 9;//チェストのスロット番号生成
            const ItemData = Inventory.getSlot(SlotNumber);

            //アイテム配置用のXY座標
            const ItemX = Math.floor(coords.chest.X + (Screen.getWidth() / 6 * 2.5) + ItemXdistance * countX);//画面の幅を÷6x2.5
            const ItemY = Math.floor(coords.chest.Y + (ItemYdistance * countY))

            //アイテム配置
            Screen.addItem(ItemX, ItemY, ItemData.getItemId());

            //アイテム数が1より上の時に数値を配置
            if (ItemData.getCount() > 1) {
                Screen.addText(ItemData.getCount().toString(), ItemX + coords.Itemcount.X, ItemY + coords.Itemcount.Y, ItemcountTextColor, false).setScale(ItemCountScale);
            }



            //シュルカーの中に入ってるアイテムを取得し表示する
            //シュルカーボックスなら
            if (ItemData.getItemId() === "minecraft:shulker_box") {

                //シュルカーボックスのNBTを取得
                const shulker_NBT = Inventory.getSlot(SlotNumber).getNBT().get("BlockEntityTag").get("Items").asListHelper()

                //チェストの中にあるシュルカーの数分繰り返す
                for (let Shulker_Count = 0;Shulker_Count < shulker_NBT.length(); Shulker_Count++) {
                    //シュルカーの数を7で割った余りが0にならない吐息
                    if (Shulker_Count % 7 !== 0) {

                        //チェストの中のアイテムと同様に
                        for (let shulker_Y = 0; shulker_Y < 3; shulker_Y++) {
                            for (let shulker_X = 0; shulker_X < 9; shulker_X++) {
                                const Shulker_Slot_Number = shulker_X + shulker_Y * 9;//スロット番号生成

                                const Shulker_Item_Data = shulker_NBT.get(Shulker_Slot_Number).asCompoundHelper();

                                const Shulker_Item_Count = Shulker_Item_Data.get("Count").asString().replace(/b/g, "");
                                const Shulker_Item_Id = Shulker_Item_Data.get("id").asString();

                                const Shulker_Item_X = coords.shulker_left.X + ItemXdistance * shulker_X;
                                const Shulker_Item_Y = coords.shulker_left.Y + ItemYdistance * shulker_Y + Shulker_Line * (Shulker_Count - 1);

                                //アイテム描画
                                Screen.addItem(Shulker_Item_X, Shulker_Item_Y, Shulker_Item_Id);

                                //アイテムの数が1こより多ければアイテムの個数を表示
                                if (Shulker_Item_Count > 1) {
                                    Screen.addText(Shulker_Item_Count, coords.Itemcount.X + Shulker_Item_X, coords.Itemcount.Y + Shulker_Item_Y, ItemcountTextColor, false).setScale(ItemCountScale);
                                }
                            }
                        }
                    } else {


                    }
                }
            }
        }
    }
}

//エレメント消去
function DeleteAllElement() {
    for (const Element of Hud.getOpenScreen().getElements().toArray()) {
        Hud.getOpenScreen().removeElement(Element);
    }
}

//Events
const OpenContainer_Event = JsMacros.on("OpenContainer", JavaWrapper.methodToJava(() => {
    Chat.log("opencontainer event");
    DeleteAllElement()
    Container_Update(coords);
}))

const ClickSlot_Event = JsMacros.on("ClickSlot", JavaWrapper.methodToJava(() => {
    Chat.log("click slot event");
    DeleteAllElement()
    Container_Update(coords);
}))

//サービス終了時の処理
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Event Stoppped")
    JsMacros.off(OpenContainer_Event);
    JsMacros.off(ClickSlot_Event)
});