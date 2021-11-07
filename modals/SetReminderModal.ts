import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import {
    BlockBuilder,
    TextObjectType,
} from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";

export async function setReminderModal(
    modify: IModify
): Promise<IUIKitModalViewParam> {
    const viewId: string = "reminderOf";
    const blockBuilder: BlockBuilder = modify.getCreator().getBlockBuilder();
    blockBuilder.addInputBlock({
        label: { type: TextObjectType.PLAINTEXT, text: "Remind You Of" },
        element: blockBuilder.newPlainTextInputElement({
            actionId: "reminder",
        }),
    });
    return {
        id: viewId,
        title: { type: TextObjectType.PLAINTEXT, text: "Set Reminder" },
        submit: blockBuilder.newButtonElement({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: "Submit",
            },
        }),
        close: blockBuilder.newButtonElement({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: "Close",
            },
        }),
        blocks: blockBuilder.getBlocks(),
    };
}
