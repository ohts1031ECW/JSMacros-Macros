// @ts-nocheck
const X = 100;//position X
const Y = 100;//position Y
const StringColor = 0xFFFFFF;

const Display2D = Hud.createDraw2D();


//hud init 
Display2D.setOnInit(JavaWrapper.methodToJava(() => {
    const BlockState = GetBlockState();

    //Block情報があった場合
    if (BlockState) {

        //BlockStateの個数分Display2Dに追加
        for (let count = 0; count < Object.keys(BlockState).length; count++) {
            Display2D.addText(`${Object.keys(BlockState).length[count]}: ${Object.values(BlockState).length[count]}`, X, Y + 10 * (count + 1), StringColor, true);
        }
    }
}))

//tick eventで毎tickごとに更新
const ticklistener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
    const Texts = Display2D.getTexts();
    const BlockState = GetBlockState();
    if (BlockState) {
        /*
        //ただのデバッグ用のログ軍
        Chat.log("Blockstate exist");
        Chat.log(`TextLength: ${Texts.length}`);
        Chat.log(`TextLength type: ${typeof Texts.length}`);
        Chat.log(`Blockstate length: ${Object.keys(BlockState).length}`);
        Chat.log(`Blockstate length type: ${typeof Object.keys(BlockState).length}`);
        Chat.log(Texts.length === Object.keys(BlockState).length);
        Chat.log(Texts.length > Object.keys(BlockState).length);
        Chat.log(Texts.length < Object.keys(BlockState).length);
        Chat.log(Texts[0])
        */


        //HUDのtextの個数とブロックの情報の個数が同一の場合
        if (Texts.length === Object.keys(BlockState).length) {

            //HUDのTextの個数分ループ
            for (let count = 0; count < Texts.length; count++) {
                Texts[count].setText(`${Object.keys(BlockState)[count]}: ${Object.values(BlockState)[count]}`);
            }

            //HUDのTextの個数>ブロックの状態の個数
        } else if (Texts.length > Object.keys(BlockState).length) {

            //HUDのTextの個数分ループ
            for (let count = 0; count < Texts.length; count++) {

                //ブロックの情報の個数がHUDのテキストの個数より少なくなったら削除
                if (count >= Object.keys(BlockState).length) {
                    Display2D.removeText(Texts[count]);

                    //それ以外
                } else {
                    Texts[count].setText(`${Object.keys(BlockState)[count]}: ${Object.values(BlockState)[count]}`);
                }
            }

            //HUDのTextの個数<ブロックの状態の個数
        } else if (Texts.length < Object.keys(BlockState).length) {

                //HUDのTextの個数分ループ
                for (let count = 0; count < Object.keys(BlockState).length; count++) {
                    //ブロックの情報の数がHUDのテキストの個数より多くなったら追加
                    if (count >= Texts.length) {
                        Display2D.addText(`${Object.keys(BlockState)[count]}: ${Object.values(BlockState)[count]}`, X, Y + 10 * (count + 1), StringColor, true);

                        //それ以外
                    } else {
                        Texts[count].setText(`${Object.keys(BlockState)[count]}: ${Object.values(BlockState)[count]}`);
                    }
                }
            
        }
    }
}));

Hud.registerDraw2D(Display2D);//outdated

event.stopListener = JavaWrapper.methodToJava(() => {
    Hud.unregisterDraw2D(Display2D);
    JsMacros.off(ticklistener);
});




//関数たち
//プレイヤーが認識しているブロックを取得する関数
function getTargetedBlock() {
    const targetblock = Player.getInteractionManager()?.getTargetedBlock();
    if (targetblock) {
        const blockdata = World.getBlock(targetblock?.getX(), targetblock?.getY(), targetblock?.getZ());
        return blockdata;
    }
}

//ブロックのstateを取得しJSONに整形しreturnする関数
function GetBlockState() {
    if (getTargetedBlock()) {
        const keys = getTargetedBlock().getBlockState().keySet().toArray();
        const values = getTargetedBlock().getBlockState().values().toArray();

        let obj = {};
        for (const valueindex in values) {
            obj[keys[valueindex]] = values[valueindex]
        }
        return obj;
    } else {
        return false;
    }
}