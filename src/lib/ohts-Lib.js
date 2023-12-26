//@ts-nocheck
/**
 * @param {string} ScriptName
 * @param {() => void} callback
 */
function ToggleScript(ScriptName, callback) {

    const color = {
        bracket: 0x7,
        string: 0x5
    }
    const reverse = !GlobalVars.getBoolean(ScriptName);
    GlobalVars.putBoolean(ScriptName, reverse);
    if (reverse) {
        Chat.log(Chat.createTextBuilder().append("[").withColor(color.bracket)
            .append(ScriptName).withColor(color.string)
            .append("]").withColor(color.bracket).append(" enabled").withColor(0xc)
            .build());
    } else {
        Chat.log(Chat.createTextBuilder().append("[").withColor(color.bracket)
            .append(ScriptName).withColor(color.string)
            .append("]").withColor(color.bracket).append(" disabled").withColor(0xc)
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
        const keys = getTargetedBlock().getBlockState().keySet().toArray();
        const values = getTargetedBlock().getBlockState().values().toArray();
        
        let obj = {};
        for(const valueindex in values){
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