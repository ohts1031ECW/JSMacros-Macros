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

module.exports = {
    ToggleScript
}