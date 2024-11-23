// @ts-nocheck
Chat.log("started craft fireworks");

//minecraft tick 1second = 20tick
const delay = 2;
const resultpick_delay = 10; //result pick delay  minimum=7

const inventory = Player.openInventory();
inventory.openGui();


const paper = inventory.findItem("minecraft:paper");
for(const paper_index of paper){
    const gunpowder = inventory.findItem("minecraft:gunpowder");
    
    //gunpowder upper than 3 stacks that run 
    if( gunpowder.length >= 3 ){
    
        //pick gunpowder 1
        inventory.click(gunpowder[0]);
        Client.waitTick(delay);
        inventory.click(1);
    
        //pick gunpowder 2
        inventory.click(gunpowder[1]);
        Client.waitTick(delay);
        inventory.click(2);
    
        //pick gunpowder 3
        inventory.click(gunpowder[2]);
        Client.waitTick(delay)
        inventory.click(3);
    
        //pick paper
        inventory.click(paper_index);
        Client.waitTick(delay);
        inventory.click(4);
        
        //result lagging wait
        Client.waitTick(resultpick_delay);
        inventory.quick(0);
        Client.waitTick(resultpick_delay);
        
    } else {
        Chat.log("Not enoght gunpowders")
        break;
    }  
}
Chat.log("firework craft finished")