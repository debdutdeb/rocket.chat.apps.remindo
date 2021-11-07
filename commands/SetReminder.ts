import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { setReminderModal } from "../modals/SetReminderModal";

export async function processMainModal(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify
): Promise<void> {
    const triggerId: string | undefined = context.getTriggerId();
    if (triggerId) {
        const modal = await setReminderModal(modify);
        await modify
            .getUiController()
            .openModalView(modal, { triggerId }, context.getSender());
    }
}
