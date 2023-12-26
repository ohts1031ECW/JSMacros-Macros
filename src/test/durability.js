/**
 * @param {JavaList<number>} getDamagedItemSlot
 */

//offhanc slot 45 (survival only
const playerinv = Player.openInventory()

const default_offhand_item = playerinv.getSlot(45);




Chat.log(`Offhand: ${default_offhand_item}`);


//耐久地が減ったアイテムのスロットを取得する関数
function getDamagedItemSlot(){
    const inv_items_slot = []
    for (let count = 0; count <= 45; count++) {
    
        //耐久地が減っているもののみを取得
        if (playerinv.getSlot(count).getDamage() > 0) {
            inv_items_slot.push(count);
            //Chat.log(`Slot: ${count}   Damage: ${playerinv.getSlot(count).getDamage()}`)
        }
    }
    return inv_items_slot
}