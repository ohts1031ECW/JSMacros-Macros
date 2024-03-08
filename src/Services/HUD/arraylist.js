//@ts-nocheck

//Arraylistの場所
const X = 0;
const Y = 0;
const services = JsMacros.getServiceManager().getServices().toArray()


Chat.log("----------")
for(const service of services){
    if(JsMacros.getServiceManager().isRunning(service.toString())){
        Chat.log(`Running: ${service}`)
    } else if ( JsMacros.getServiceManager().isEnabled(service.toString())){
        Chat.log(`Enabled: ${service}`)
    } else if (JsMacros.getServiceManager().isCrashed(service.toString())){
        Chat.log(`Crashed: ${service}`)
    }
}
Chat.log("----------")


const Display2D = Hud.createDraw2D();

//初期化処理
Display2D.setOnInit(JavaWrapper.methodToJava(()=>{
    Display2D.addText("JSMacros Arraylist",X,Y,0xffffff,false);
}))
Display2D.register()

const customEvent = JsMacros.createCustomEvent("ServiceChange").registerEvent();

const Event = JsMacros.on("ServiceChange",JavaWrapper.methodToJava(()=>{
    Chat.log("event test")
}))


event.stopListener = JavaWrapper.methodToJava(() => {
    JsMacros.off(Event);
    Display2D.unregister()
});