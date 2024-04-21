//@ts-nocheck

//config area
const minemenukeybind = "key.keyboard.r"


//config area end

const d2d = Hud.createDraw2D();
const displayheight = d2d.getHeight();
const displaywidth = d2d.getWidth();
Chat.log(displayheight);
Chat.log(displaywidth)
d2d.setOnInit(JavaWrapper.methodToJava(() => {
    Chat.log(displayheight)
    Chat.log(displaywidth)
    d2d.addLine(
        Math.floor(displaywidth/2),//X始点
        Math.floor(displayheight/2),//Y始点
        Math.floor(displaywidth/2),//X終点
        Math.floor((displayheight/2)/2),//Y終点
        0xFFFFFF,
    ).setWidth(10.0)

    d2d.addText("test",
    10,
    10,
    0xFFFFFF,
    false)//これは動いた
    Chat.log(d2d.getLines().toArray())

    //d2d.register()
}))
d2d.register()

//d2d.setVisible(false);


//tick listener
const ticklistener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
    const pressedkey = KeyBind.getPressedKeys().toArray();
    //Chat.log(pressedkey);

    //if pressed minemenukeybind key
    if (pressedkey.includes(minemenukeybind)) {

    }




}))

event.stopListener = JavaWrapper.methodToJava(() => {
    //Hud.unregisterDraw2D(d2d);
    JsMacros.off(ticklistener);
});