import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { parseParams } from "../lib/helpers";
import { CLArgs } from "../models/Args";
import { RemindoApp } from "../RemindoApp";
import { processHelpCommand } from "./Help";
import { processMainModal } from "./SetReminder";

export class RemindoCommand implements ISlashCommand {
    public command = "remindo";
    public i18nDescription = "show help";
    public i18nParamsExample =
        "help, set [option], of [message] at [time] on [date]";
    public providesPreview = false;

    constructor(private readonly app: RemindoApp) {
        this.app = app;
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp
    ): Promise<void> {
        const args: CLArgs | undefined = parseParams(context.getArguments());
        if (!args || !args.of || (!args.at && !args.on)) {
            // anything not being able to successfully parse args to CLArgs
            // results in undefined return, including the subcommand help
            // so no need to check for that explicitely.
            processMainModal(context, read, modify);
            processHelpCommand(context, read, modify);
            return;
        }
    }
}
