// @ts-nocheck
const Event = JsMacros.on("OpenContainer",JavaWrapper.methodToJava(()=>{
    Chat.log("Event fire");
}));

event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Event Stoppped")
    JsMacros.off(Event);
});