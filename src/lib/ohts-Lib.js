
/**
 * @param {string} ScriptName
 * @param {() => void} callback
 * @param {{ 
 * script: {bracket: number,name:number}; togglemsg: {enable:number,disenable:number}; } | undefined} color
 */
function ToggleScript(ScriptName, callback,color) {
    if(color === undefined){
        color = {
            script: {
                bracket: 0x7,
                name: 0x5
            },
            togglemsg: {
                enable: 0x00ff00,
                disenable: 0xc,
            }
        }
    }
    color.script.bracket


    const reverse = !GlobalVars.getBoolean(ScriptName);
    GlobalVars.putBoolean(ScriptName, reverse);
    if (reverse) {
        Chat.log(Chat.createTextBuilder().append("[").withColor(color.script.bracket)
            .append(ScriptName).withColor(color.script.name)
            .append("]").withColor(color.script.bracket).append(" enabled").withColor(color.togglemsg.enable)
            .build());
    } else {
        Chat.log(Chat.createTextBuilder().append("[").withColor(color.script.bracket)
            .append(ScriptName).withColor(color.script.name)
            .append("]").withColor(color.script.bracket).append(" disabled").withColor(color.togglemsg.disenable)
            .build());
    }
    while (GlobalVars.getBoolean(ScriptName)) {
        callback()
    }

}

//プレイヤーが認識しているブロックを取得する関数
function getTargetedBlock(){
    const targetblock = Player.getInteractionManager()?.getTargetedBlock();
    if(targetblock){
        const blockdata = World.getBlock(targetblock?.getX(),targetblock?.getY(),targetblock?.getZ());
        return blockdata;
    }
}

//ブロックのstateを取得しJSONに整形しreturnする関数
function GetBlockState(){
    if(getTargetedBlock()){
        const keys = getTargetedBlock()?.getBlockState().keySet().toArray();
        const values = getTargetedBlock()?.getBlockState().values().toArray();
        
        let obj = {};
        for(const valueindex in values){
            //@ts-ignore
            obj[keys[valueindex]] = values[valueindex]
        }
        return obj;
    } else {
        return false;
    }
}

module.exports = {
    ToggleScript,
    getTargetedBlock,
    GetBlockState,
}