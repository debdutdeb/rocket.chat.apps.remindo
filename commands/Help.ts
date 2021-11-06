import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom, RoomType } from "@rocket.chat/apps-engine/definition/rooms";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function processHelpCommand(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify
) {
    const botUser = (await read.getUserReader().getAppUser()) as IUser;
    const users = [botUser.username, context.getSender().username];
    let room = await read.getRoomReader().getDirectByUsernames(users);
    if (!room) {
        let roomId = await modify
            .getCreator()
            .finish(
                modify
                    .getCreator()
                    .startRoom()
                    .setType(RoomType.DIRECT_MESSAGE)
                    .setCreator(botUser)
                    .setMembersToBeAddedByUsernames(users)
            );
        room = (await read.getRoomReader().getById(roomId)) as IRoom;
    }
    await modify.getCreator().finish(
        modify
            .getCreator()
            .startMessage()
            .setSender((await read.getUserReader().getAppUser()) as IUser)
            .setRoom(room)
            .setText("a help text")
    );
}
