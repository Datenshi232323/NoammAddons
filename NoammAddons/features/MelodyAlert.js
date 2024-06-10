/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInDungeon, registerWhen } from "../utils"
const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")

function StartOrStop() {
    return Settings.MelodyAlert.removeFormatting() && IsInDungeon()
}


const trigger = register(`packetReceived`, (packet) => {
    const WindowTitle = ChatLib.removeFormatting(packet.func_179840_c().func_150254_d())
    if (WindowTitle.toLowerCase() !== `click the button on time!`) return

    ChatLib.command(`pc ${Settings.MelodyAlert.removeFormatting()}`)

}).setFilteredClass(S2DPacketOpenWindow).unregister()


registerWhen(trigger, StartOrStop)
