//@ts-nocheck
const Screen = Hud.createScreen("ClickGui", false);

if (!FS.exists("./modules")) {
    FS.makeDir("modules");
    Chat.log("modulesディレクトリが存在しなかったため作成しました。")
}

//スクリーン初期化処理
Screen.setOnInit(JavaWrapper.methodToJava((scr) => {
    //Chat.log(scr.getHeight())
    //Chat.log(scr.getWidth())

    const scripts = FS.list("./modules/");
    const layer = Math.floor(scr.getHeight() / scripts.length)
    for (const scriptindex in scripts) {

        const type = scripts[scriptindex].match(/\[(.+)\]/)[1];
        const name = scripts[scriptindex].match(/\](.+)\./)[1]
        //Chat.log(type)
        //add to screen
        scr.addButton(
            10,
            layer * scriptindex,
            100,
            20,
            name,
            JavaWrapper.methodToJava(() => {
                JsMacros.runScript(`./modules/${scripts[scriptindex]}`);
                scr.close()
            })
        )
    }
}))



Hud.openScreen(Screen);;