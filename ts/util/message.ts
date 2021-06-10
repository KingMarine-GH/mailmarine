import { Message } from "discord.js";
import * as Db from "res/types/database";
import * as cache from "memory-cache";

const db = globalThis.db;
const readfile = globalThis.readSql;

function check(err: unknown): void {
    console.error(err);
}

// anti memory leak lol
setInterval(() => {
    cache.clear();
}, 10800000);

export const createMessage = async (message: Message): Promise<void> => {
    // check if user exists in the db and isn't banned

    const user: Db.User = await db.execute(readfile("@sql/users/readUsersById.sql"), [message.author.id]).catch(check)[0][0];

    if (!user.localid) {
        // user isn't registered yet to the system
        db.query(readfile("@sql/users/readUsersById.sql"), [message.author.id]).catch(check);
    } else {
        const banDetails: Db.Bans = await db.query(readfile("@sql/users/checkForBan.sql"), ["user", user.localid]).catch(check)[0][0];
        if ((parseInt(banDetails.expiryDate) > new Date().getTime()) || !banDetails.temporary) {
            return;
        }
    }

    db.execute(readfile("@sql/messages/origin/newMessage.sql"), [message.id, message.guild.id, message.author.id]).catch(check);
};

export const deleteMessage = async (messageId: string): Promise<void> => {
    const origin = await db.execute(readfile("@sql/messages/origin/findMessage.sql"), [messageId]).catch(check)[0];
    const replicated = await db.execute(readfile("@sql/messages/findMessage.sql")).catch(check)[0];

    db.execute(readfile("@sql/messages/origin/deleteMessage.sql"), [origin.deleted]).catch(check);
};