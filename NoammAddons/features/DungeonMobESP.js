/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../../RenderLib"
import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

let InBoss = false

let Criteria = [
    `[BOSS] Maxor:`,
    `[BOSS] Storm`,
    `[BOSS] Goldor`,
    `[BOSS] Necron`, 
    `[BOSS] Sadan:`,
    `[BOSS] Livid:`,
    `[BOSS] Thorn:`,
    `[BOSS] The Professor:`,
    `[BOSS] Scarf:`,
    `[BOSS] Bonzo:`
]


register(`worldUnload`, () => {
    InBoss = false
    const trigger = register(`chat`, (e) => {
        let ChatMessage = ChatLib.getChatMessage(e,false).toString()
        if (Dungeon.inDungeon) {
            for (i=0 ; i < Criteria.length ; i++) {
                if (ChatMessage.startsWith(Criteria[i])) {
                    InBoss = true
                    trigger.unregister()
                }
            }
        }
    })
    trigger.register()
})

register("renderEntity", (entity, pos, partialTicks, event) => {
    if (!Settings.DungeonMobESP || !Dungeon.inDungeon || InBoss) return
    let name = entity.getName();
    const espBox = (x, y, z, height) => {RenderLib.drawEspBox(x, y-height, z, 0.9, height, Settings.MobESPColor.getRed()/255 ,Settings.MobESPColor.getGreen()/255, Settings.MobESPColor.getBlue()/255, 1, true);}
    const espfilledBox = (x, y, z, height) => {RenderLib.drawInnerEspBox(x, y-height, z, 0.9, height, Settings.MobESPColor.getRed()/255 ,Settings.MobESPColor.getGreen()/255, Settings.MobESPColor.getBlue()/255, Settings.MobESPColor.getAlpha() /255, 1, true);}

    if (name.includes("✯") || name.includes("Shadow Assassin") || name.includes("Frozen Adventurer") || name.includes("Lost Adventurer") || name.includes("bat")) {
        if (name.includes("Fel") || name.includes("Withermancer")) {
           // entity.getEntity().func_82142_c(false);
            if (Settings.MobESPMode == 0) espBox(entity.getX(), entity.getY(), entity.getZ(), 2.8);
            else if (Settings.MobESPMode == 1) espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 2.8)
            else {
                espBox(entity.getX(), entity.getY(), entity.getZ(), 2.8)
                espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 2.8)
            }
        } else {
           // entity.getEntity().func_82142_c(false);
            if (Settings.MobESPMode == 1) espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
            else if (Settings.MobESPMode == 0) espBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
            else {
                espBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
                espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
            }
        }
    }
});



