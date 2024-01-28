//@ts-nocheck
const entityNBT = Player.getInteractionManager()?.getTargetedEntity()?.getNBT()
Chat.log(entityNBT.get("Health"));
Utils.copyToClipboard(entityNBT?.toString())