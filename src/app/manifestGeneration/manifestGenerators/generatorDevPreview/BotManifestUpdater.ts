// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";

let Guid = require('guid');

export class BotManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        var newbot:any = {
            botId: `{{${options.botidEnv}}}`,
            needsChannelSelector: true,
            isNotificationOnly: false,
            scopes: ["team", "personal", "groupchat"],
            commandLists: [
                {
                    "scopes": [
                        "team",
                        "personal"
                    ],
                    "commands": [
                        {
                            "title": "Help",
                            "description": "Shows help information"
                        }
                    ]
                }
            ]
        };

        if (options.staticTab) {
            manifest.staticTabs.push({
                entityId: Guid.raw(),
                name: options.staticTabTitle,
                contentUrl: `https://{{HOSTNAME}}/${options.botName}/${options.staticTabName}.html`,
                scopes: ["personal"]
            });
        }
        if(options.botCallingEnabled) {
            newbot.supportsCalling = true;
            newbot.supportsVideo = true;
        }

        (<any[]>manifest.bots).push(newbot);
    }
}