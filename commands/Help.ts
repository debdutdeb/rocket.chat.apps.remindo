import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { sendMessage } from "../lib/helpers";

export async function processHelpCommand(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify
) {
    const sender: IUser = (await read.getUserReader().getAppUser()) as IUser;
    const participants: Array<IUser> = [sender, context.getSender()];
    const message: string = "help";
    await sendMessage({ read, modify, sender, participants, message });
}
