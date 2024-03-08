//@ts-nocheck

Chat.log(GetTargetEntity())

function GetTargetEntity(){
    const TargetEntity = Player.getInteractionManager().getTargetedEntity();
    return TargetEntity
}


const Event = JsMacros.on("Custom",JavaWrapper.methodToJava(()=>{
    Chat.log(GetTargetEntity())
}))


//when service stopped
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Event Stoppped")
    JsMacros.off(Event)
});
