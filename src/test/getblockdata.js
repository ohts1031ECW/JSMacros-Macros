//@ts-nocheck
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

Chat.log(`getblockstate`)
Chat.log(GetBlockState())