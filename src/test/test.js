//@ts-nocheck
function ButtonClick(){
  const Screen = Hud.getOpenScreen();

  Screen.addText("TEEST",100,100,0xffffff,true).setScale(2.0).setZIndex(0)
  Screen.addButton(Screen.getWidth()-50,Screen.getHeight()-50,25,25,10,">",JavaWrapper.methodToJava((click)=>{

    Chat.log(click)
    
    //エレメント取得
    const Elements = Screen.getElements().toArray();

    //エレメント前部に対してのループ
    for(const ELement of Elements){
      Chat.log(`Element: ${ELement.getZIndex()}`)

      //エレメントのzindexが0であれば
      if(ELement.getZIndex() === 0){

        //エレメントを削除
        Screen.removeElement(ELement);

        //再描画
        Screen.addText("UPDATED TEST",100,100,0xffffff,true).setScale(2.0).setZIndex(1)
      }
    }

  }))

  Screen.addButton(Screen.getWidth()-100,Screen.getHeight()-50,25,25,10,"<",JavaWrapper.methodToJava((click)=>{

    Chat.log(click)
    
        //エレメント取得
        const Elements = Screen.getElements().toArray();

        //エレメント前部に対してのループ
        for(const ELement of Elements){
          Chat.log(`Element: ${ELement.getZIndex()}`)
    
          //エレメントのzindexが0であれば
          if(ELement.getZIndex() === 1){
    
            //エレメントを削除
            Screen.removeElement(ELement);
    
            //再描画
            Screen.addText("TEEST",100,100,0xffffff,true).setScale(2.0).setZIndex(0)
          }
        }
        
  }))
}


JsMacros.on("OpenContainer", JavaWrapper.methodToJava(() => {
  Chat.log("opencontainer")
  ButtonClick()

}))
/*
const shulkerBoxes = [
  "minecraft:white_shulker_box",
  "minecraft:light_gray_shulker_box",
  "minecraft:gray_shulker_box",
  "minecraft:black_shulker_box",
  "minecraft:brown_shulker_box",
  "minecraft:red_shulker_box",
  "minecraft:orange_shulker_box",
  "minecraft:yellow_shulker_box",
  "minecraft:lime_shulker_box",
  "minecraft:green_shulker_box",
  "minecraft:cyan_shulker_box",
  "minecraft:light_blue_shulker_box",
  "minecraft:blue_shulker_box",
  "minecraft:purple_shulker_box",
  "minecraft:magenta_shulker_box",
  "minecraft:pink_shulker_box"
];

function SplitFromEnd(stringinput,number){
  //文字の長さ-後ろからの文字数で前からの文字数を求める
  const start = stringinput.length -number;

  const result = stringinput.substring(0,start);

  return result;

}

for(const box of shulkerBoxes){
  Chat.log(`${ SplitFromEnd(box,12).split(":")[1]}`)
}
*/

/*
const scanner = World.getWorldScanner()
.withBlockFilter("getId").contains("chest")
.build()
const rawdate = scanner.scanAroundPlayer(5).toString();
const array = rawdate.replace(/[|]/g,"").split(",")

Chat.log(rawdate);
Chat.log(typeof rawdate)
Chat.log(array)
Chat.log(typeof array)
//let out = [];
for(const index in rawdate.length){
    Chat.log(`index: ${index}`);
    Chat.log(`item: ${rawdate[index]}`)
}
/*
.withBlockFilter("getHardness").is("<=", 10)
.andStringBlockFilter().contains("chest", "barrel")
.withStringStateFilter().contains("facing=south")
.andStateFilter("isToolRequired").is(false)
.build()
*/
//Chat.log(out)
