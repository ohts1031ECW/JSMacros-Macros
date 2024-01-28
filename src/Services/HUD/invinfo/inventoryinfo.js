//@ts-nocheck


//ここから文字サイズ位置等微調整用
//描画の座標微調整用
//描画の位置がずれていた場合に数値(マイナスプラス)を入れて修正してください たぶん修正しないとほぼ確実にずれます
const coords = {
    chest: {
        X: -5,
        Y: 10
    },
    shulker: {
        leftX: 2,
        rightX: 0,
        Y: 3
    },
    Itemcount: {
        X: -2,
        Y: -2
    },
    Shulker_Name: {
        X: 0,
        Y: 0
    },
    PageButton: {
        CenterDistance: 50,
        Width: 25,
        Height: 25
    }
}
const Zindexconst = {
    Button: 100,
    Page: [0, 1],
    Inventory: 99
}
const ItemcountTextColor = 0xffffff;//16進数カラーコードで指定 カラーコード頭の#は0xに置き換えてください デフォルトは0xffffff の白です
const Shulker_Box_Name_Text_color = 0xffffff;//↑と同じく
const Shulker_Box_Name_text_Scale = 0.9;//default 0.9
const ItemCountScale = 0.65 //アイテム個数表示の文字の大きさを指定します デフォルトは0.65です
const Shulker_Box_Color_Template = {
    default: 0x800080,
    White: 0xffffff,

}

//ここまで
const debug = true


//引数 (coords)
function Container_Update(coords, Zindex) {

    //個々れへんの変数群絶対もっと効率化できると思う
    const Inventory = Player.openInventory();//Inventory
    const Screen = Hud.getOpenScreen();//IScreen
    const ScreenName = Hud.getOpenScreenName();//ScreenName
    const ScreenHight_100 = Screen.getHeight() / 100;
    const ScreenWidth_100 = Screen.getWidth() / 100;
    const ItemXdistance = Math.floor(ScreenWidth_100 * 2);
    const ItemYdistance = Math.floor(ScreenHight_100 * 4);

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
            Screen.addItem(ItemX, ItemY, ItemData.getItemId()).setZIndex(Zindex);

            //アイテム数が1より上の時に数値を配置
            if (ItemData.getCount() > 1) {
                Screen.addText(ItemData.getCount().toString(), ItemX + coords.Itemcount.X, ItemY + coords.Itemcount.Y, ItemcountTextColor, false).setScale(ItemCountScale).setZIndex(Zindex);
            }
        }
    }
}

//シュルカー内のアイテム取得
/**
 * @param {any} min
 * @param {number} max
 */
function GetShulkerItem(min, max, coords, Zindex) {
    const Screen = Hud.getOpenScreen()
    const Inventory = Player.openInventory();
    const Shulker_X_Line_base = Math.floor(Screen.getWidth() / 5);
    const Shulker_Y_Line_base = Math.floor(Screen.getHeight() / 7);
    let Shulker_X_Line = 0;
    let tmp = 0;
    let shulkercount = 0;
    if(Hud.getOpenScreenName() !== "3 Row Chest"  || Hud.getOpenScreenName() !== "6 Row Chest") return;
    for (let count = min; count < max; count++) {

        //シュルカーボックスの場合処理
        if (/shulker_box/.test(Inventory.getSlot(count).getItemId())) {
            shulkercount++;

            //シュルカーボックスにNBTがなかったらループをスキップ
            if (Inventory.getSlot(count).getNBT() === null) {
                continue;
            }

            const shulker_NBT = Inventory.getSlot(count).getNBT().get("BlockEntityTag").get("Items").asListHelper();

            //シュルカーの表示が7段目になったらXを右にずらす
            if (shulkercount % 8 === 0 && shulkercount !== 0) {
                Shulker_X_Line++
                shulkercount = 1
            }

            if (Shulker_X_Line >= 2) {
                tmp = 1;
            }

            //シュルカーボックスに名前がついてる場合は表示
            const Shulker_Default_Name = Inventory.getSlot(count).getDefaultName().getString();
            const Shulker_Name = Inventory.getSlot(count).getName().getString();

            //シュルカーボックスの名前がデフォルドじゃなければ表示
            if (Shulker_Default_Name !== Shulker_Name) {

                Screen.addText(
                    Shulker_Name,
                    coords.Shulker_Name.X + Shulker_X_Line_base * (Shulker_X_Line + tmp),
                    coords.Shulker_Name.Y + Shulker_Y_Line_base * shulkercount - Math.floor(Screen.getHeight() / 28),
                    0xffffff,
                    false
                ).setScale(Shulker_Box_Name_text_Scale)
                    .setZIndex(Zindex)
            }



            for (let countY = 0; countY < 3; countY++) {
                for (let countX = 0; countX < 9; countX++) {
                    const SlotNumber = countX + countY * 9;

                    const Shulker_Item_Data = shulker_NBT.get(SlotNumber).asCompoundHelper();

                    //アイテムid取得
                    const Shulker_Item_Id = Shulker_Item_Data.get("id").asString();
                    const Shulker_Item_Count = Shulker_Item_Data.get("Count").asString().replace(/b/g, "");

                    const Shulker_Item_X = Math.floor(coords.shulker.leftX + (Screen.getWidth() / 50) * countX + Shulker_X_Line_base * (Shulker_X_Line + tmp))
                    const Shulker_Item_Y = Math.floor(coords.shulker.Y + (Screen.getWidth() / 50) * countY + Shulker_Y_Line_base * (shulkercount - 1));



                    //アイテム描画
                    Screen.addItem(Shulker_Item_X, Shulker_Item_Y, Shulker_Item_Id).setZIndex(Zindex);


                    //アイテムの数が1より多ければ表示
                    if (Shulker_Item_Count > 1) {
                        Screen.addText(
                            Shulker_Item_Count,
                            Math.floor(coords.Itemcount.X + Shulker_Item_X),
                            Math.floor(coords.Itemcount.Y + Shulker_Item_Y),
                            ItemcountTextColor,
                            false
                        ).setScale(ItemCountScale)
                            .setZIndex(Zindex)
                    }

                }
            }

        }
    }
}

//ページネーションボタンクリック時の処理関数
function PageButtonPress() {
    const Screen = Hud.getOpenScreen();

    Screen.addButton(
        Screen.getWidth() - coords.PageButton.Width,
        Screen.getHeight() - coords.PageButton.Height,
        coords.PageButton.Width,
        coords.PageButton.Height,
        100,
        "+",
        JavaWrapper.methodToJava((click) => {
            if(debug){
                Chat.log(click);
            }
            


            //ボタン(zindex 100)以外のエレメントを削除
            for (const Element of Screen.getElements().toArray()) {
                if (Element.getZIndex() < 99) {
                    Screen.removeElement(Element);
                }
            }

            //シュルカーの中のアイテムの表示を再描画
            GetShulkerItem(27, 54, coords, 1);


        }))

    Screen.addButton(
        Screen.getWidth() - coords.PageButton.CenterDistance - coords.PageButton.Width,
        Screen.getHeight() - coords.PageButton.Height,
        coords.PageButton.Width,
        coords.PageButton.Height,
        100,
        "-",
        JavaWrapper.methodToJava((click) => {
            if(debug){
                Chat.log(click);
            }



            //ボタン(zindex 100)以外のエレメントを削除
            for (const Element of Screen.getElements().toArray()) {
                if (Element.getZIndex() < 99) {
                    Screen.removeElement(Element);
                }
            }

            //シュルカーの中のアイテムの表示を再描画
            GetShulkerItem(0, 27, coords, 0);


        }))
}

//エレメント消去
function DeleteAllElement() {
    for (const Element of Hud.getOpenScreen().getElements().toArray()) {
        Hud.getOpenScreen().removeElement(Element)
    }
}

//Events
const OpenContainer_Event = JsMacros.on("OpenContainer", JavaWrapper.methodToJava(() => {
    if(debug) Chat.log("opencontainer event");

    DeleteAllElement();
    PageButtonPress();
    Container_Update(coords, Zindexconst.Inventory);
    GetShulkerItem(0, 27, coords, 0);


}))

const ClickSlot_Event = JsMacros.on("ClickSlot", JavaWrapper.methodToJava(() => {
    if(debug) Chat.log("click slot event");

    const Zindex = Hud.getOpenScreen().getElements().toArray()[100].getZIndex();
    DeleteAllElement();
    Container_Update(coords, Zindexconst.Inventory);
    if(Zindex === 1){
        GetShulkerItem(27,54, coords, 1);
    } else {
        GetShulkerItem(0,27, coords, 0);
    }
    
    PageButtonPress();
    
}))

//サービス終了時の処理
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Event Stoppped")
    JsMacros.off(OpenContainer_Event);
    JsMacros.off(ClickSlot_Event)
});