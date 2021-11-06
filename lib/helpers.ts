import { CLArgs } from "../models/Args";

function splitByQuotes(input: string): Array<string> {
    /* Taken from https://github.com/elgs/splitargs/blob/master/splitargs.js
     * slightly modified.
     * fork kept at https://github.com/debdutdeb/splitargs
     */
    const separator: RegExp = /\s/g;

    let singleQuoteOpen: boolean = false;
    let doubleQuoteOpen: boolean = false;
    let tokenBuffer: Array<string> = new Array();
    let ret: Array<string> = new Array();

    let inputArray: Array<string> = input.split("");

    for (let element of inputArray) {
        let matches: RegExpMatchArray | null = element.match(separator);
        if (element === "'" && !doubleQuoteOpen) {

            singleQuoteOpen = !singleQuoteOpen;

            continue;
        } else if (element === '"' && !singleQuoteOpen) {

            doubleQuoteOpen = !doubleQuoteOpen;

            continue;
        }

        if (!singleQuoteOpen && !doubleQuoteOpen && matches) {
            if (tokenBuffer.length > 0) {
                ret.push(tokenBuffer.join(""));
                tokenBuffer = [];
            } else if (!!separator) {
                ret.push(element);
            }
        } else {
            tokenBuffer.push(element);
        }
    }

    if (tokenBuffer.length > 0) {
        ret.push(tokenBuffer.join(""));
    } else if (!!separator) {
        ret.push("");
    }

    return ret;
}

export function parseParams(args: Array<string>): CLArgs | undefined {
    let argsObject: CLArgs = { on: null, of: null, at: null };

    args = splitByQuotes(args.join(" "));

    if (args.length % 2) {
        // args length must now be even
        return undefined;
    }

    for (let z = 0; z < args.length; z += 2) {
        if (!(args[z] in argsObject)) {
            return undefined;
        }

        if (argsObject[args[z]]) {
            continue;
        }

        argsObject[args[z]] = args[z + 1];
    }
    return argsObject;
}
