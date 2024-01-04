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
    },
    Shulker_Name: {
        X: 0,
        Y: 0
    },
    page: {
        left: {
            X: 0,
            Y: 0
        },
        right: {
            X: 0,
            Y: 0
        }
    }
}
const ItemcountTextColor = 0xffffff;//16進数カラーコードで指定 カラーコード頭の#は0xに置き換えてください デフォルトは0xffffff の白です
const Shulker_Box_Name_Text_color = 0xffffff;//↑と同じく
const ItemCountScale = 0.65 //アイテム個数表示の文字の大きさを指定します デフォルトは0.65です
const Shulker_Box_Color_Template = {
    default: 0x800080,
    White: 0xffffff,

}

//ここまで

const options_Def = {
    countY_Default: 0,
    Zindex: 0
}

//引数 (coords)
function Container_Update(coords, options = options_Def) {

    //個々れへんの変数群絶対もっと効率化できると思う
    const Inventory = Player.openInventory();//Inventory
    const Screen = Hud.getOpenScreen();//IScreen
    const ScreenName = Hud.getOpenScreenName();//ScreenName
    const ScreenHight_100 = Screen.getHeight() / 100;
    const ScreenWidth_100 = Screen.getWidth() / 100;
    const ItemXdistance = Math.floor(ScreenWidth_100 * 2);
    const ItemYdistance = Math.floor(ScreenHight_100 * 4);
    const Shulker_Y_Line = Math.floor(Screen.getHeight() / 7);
    const Shulker_X_Line_base = Math.floor(Screen.getWidth() / 5)

    let container_hight
    if (ScreenName === "3 Row Chest" || ScreenName === "Shulker Box") {
        container_hight = 3;
    } else if (ScreenName === "6 Row Chest") {
        container_hight = 6;
    }

    //ページ

    let Shulker_box_count = 0;
    let Shulker_Count = 0;
    let Shulker_X_Line = 0;
    let right_temp = 0;
    //アイテム描画
    for (let countY = options.countY_Default; countY < container_hight; countY++) {
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
            Screen.addItem(ItemX, ItemY, ItemData.getItemId()).setZIndex(options.Zindex);

            //アイテム数が1より上の時に数値を配置
            if (ItemData.getCount() > 1) {
                Screen.addText(ItemData.getCount().toString(), ItemX + coords.Itemcount.X, ItemY + coords.Itemcount.Y, ItemcountTextColor, false).setScale(ItemCountScale).setZIndex(options.Zindex);
            }

            //シュルカーの中に入ってるアイテムを取得し表示する
            //シュルカーボックスなら
            if (/shulker_box/.test(ItemData.getItemId())) {
                Shulker_Count++;
                Shulker_box_count++;
                //シュルカーボックスの色をアイテムidから取得
                const Shulker_Box_Item_Id = ItemData.getItemId().toString();
                let Shulker_Box_Color;
                if (Shulker_Box_Item_Id.length === 21) {
                    Shulker_Box_Color = "default";
                } else {
                    Shulker_Box_Color = Shulker_Box_Item_Id.split(":")[1].split("_")[0];
                }


                //シュルカーボックスが空の時はループを飛ばす
                if (Inventory.getSlot(SlotNumber).getNBT() === null) {
                    continue;
                }


                //シュルカーボックスのNBTを取得
                const shulker_NBT = Inventory.getSlot(SlotNumber).getNBT().get("BlockEntityTag").get("Items").asListHelper();

                //右のやつ
                if (Shulker_X_Line >= 2) {
                    right_temp = 1
                }
                //チェストの中のアイテムと同様に
                for (let shulker_Y = 0; shulker_Y < 3; shulker_Y++) {
                    for (let shulker_X = 0; shulker_X < 9; shulker_X++) {
                        const Shulker_Slot_Number = shulker_X + shulker_Y * 9;//スロット番号生成

                        const Shulker_Item_Data = shulker_NBT.get(Shulker_Slot_Number).asCompoundHelper();

                        const Shulker_Item_Count = Shulker_Item_Data.get("Count").asString().replace(/b/g, "");
                        const Shulker_Item_Id = Shulker_Item_Data.get("id").asString();

                        const Shulker_Item_X = coords.shulker_left.X + ItemXdistance * shulker_X + Shulker_X_Line_base * (Shulker_X_Line + right_temp);
                        const Shulker_Item_Y = coords.shulker_left.Y + ItemYdistance * shulker_Y + Shulker_Y_Line * (Shulker_Count - 1);

                        //アイテム描画
                        Screen.addItem(Shulker_Item_X, Shulker_Item_Y, Shulker_Item_Id).setZIndex(options.Zindex);

                        //アイテムの数が1こより多ければアイテムの個数を表示
                        if (Shulker_Item_Count > 1) {
                            Screen.addText(Shulker_Item_Count, coords.Itemcount.X + Shulker_Item_X, coords.Itemcount.Y + Shulker_Item_Y, ItemcountTextColor, false).setScale(ItemCountScale).setZIndex(options.Zindex);
                        }
                    }
                }

                //シュルカーボックスの名前(ついてれば)描画
                const Shulker_Box_name = Inventory.getSlot(SlotNumber).getName().getString();
                const Shulker_Box_Default_Name = Inventory.getSlot(SlotNumber).getDefaultName().getString()
                if (Shulker_Box_name !== Shulker_Box_Default_Name) {
                    Screen.addText(
                        Shulker_Box_name,
                        Shulker_X_Line_base * (Shulker_X_Line + right_temp) + coords.Shulker_Name.X,
                        Math.floor(Shulker_Y_Line * (Shulker_Count - 1) + Shulker_Y_Line - ScreenHight_100 * 2) + coords.Shulker_Name.Y,
                        Shulker_Box_Name_Text_color,
                        false
                    ).setZIndex(options.Zindex)
                }
                //シュルカーボックスごとにシュルカーボックスの色の枠
                //開発中

                //一番右の列がページボタンと被るため別処理
                if (Shulker_X_Line === 3 && container_hight === 6 && Shulker_Count % 6 === 0) {
                    Shulker_Count = 0
                }

                //シュルカーの数を7で割った余りが0でありshulker_countが0でないとき
                if (Shulker_Count % 7 === 0 && Shulker_Count !== 0) {
                    Shulker_X_Line++
                    Shulker_Count = 0;
                }
            }
        }
    }
}

//ページネーションボタンクリック時の処理関数
function ButtonClick() {
    const Screen = Hud.getOpenScreen();

    Screen.addButton(Screen.getWidth() - 50, Screen.getHeight() - 50, 25, 25, 10, "+", JavaWrapper.methodToJava((click) => {

        Chat.log(click)

        //エレメント取得
        const Elements = Screen.getElements().toArray();

        //ページ移動エレメント以外を削除
        for (const Element of Elements) {
            if (Element.getZIndex() !== 10) {
                Screen.removeElement(Element)
            }
        }
        
        //更新
        Container_Update(coords,{countY_Default:3,Zindex:1})
    }))

    Screen.addButton(Screen.getWidth() - 100, Screen.getHeight() - 50, 25, 25, 10, "-", JavaWrapper.methodToJava((click) => {
        Chat.log(click)

        //エレメント取得
        const Elements = Screen.getElements().toArray();



        //ページ移動エレメント以外を削除
        for (const Element of Elements) {
            if (Element.getZIndex() !== 10) {
                Screen.removeElement(Element)
            }
        }

        //更新
        Container_Update(coords,{countY_Default:0,Zindex:0})
    }))
}


function GetShulkerBoxCount(slot) {
    let shulkerboxcount = 0;
    for (let count = 0; count < slot; count++) {
        if (Player.openInventory().getSlot(count).getNBT !== null) {
            shulkerboxcount++
        }
    }
    return shulkerboxcount;
}
//エレメント消去
function DeleteAllElement() {
    for (const Element of Hud.getOpenScreen().getElements().toArray()) {
        Hud.getOpenScreen().removeElement(Element)
    }
}

//Events
const OpenContainer_Event = JsMacros.on("OpenContainer", JavaWrapper.methodToJava(() => {
    Chat.log("opencontainer event");
    DeleteAllElement()
    Container_Update(coords);
    ButtonClick()

}))

const ClickSlot_Event = JsMacros.on("ClickSlot", JavaWrapper.methodToJava(() => {
    Chat.log("click slot event");
    DeleteAllElement()
    Container_Update(coords);
    ButtonClick()
}))

//サービス終了時の処理
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Event Stoppped")
    JsMacros.off(OpenContainer_Event);
    JsMacros.off(ClickSlot_Event)
});