// Generated by https://quicktype.io

import * as internal from "stream";
import { message, Role } from "./discord";

export interface InteractionJson {
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_permission?: boolean;
}

interface ApplicationCommandOption {
    type: number;
    name: string;
    description: string;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
}

interface ApplicationCommandOptionChoice {
    name: string;
    value: string | number;
}

export interface Interaction {
    id:             string;
    application_id: string;
    type:           number;
    data?:          Data;
    guild_id:       string;
    channel_id:     string;
    member?:        Member;
    user?:          User;
    token:          string;
    version:        number;
    message?:       message;
}

interface Data {
    id:             string;
    name:           string;
    resolved?:      DataResolved;
    options?:       InteractionData;
    custom_id:      string;
    component_type: internal;
}

interface DataResolved {
    users?:    Map<string, User> ;
    members?:  Map<string, PartialMember>;
    roles?:    Map<string, Role>;
    channels?: Map<string, PartialChannel>;
}

interface InteractionData {
    id:             string;
    name:           string;
    resolved?:      DataResolved;
    options?:       DataOption[];
    custom_id:      string;
    component_type: number;
}

interface DataOption {
    name: string;
    type: number;
    value?: Option;
    options?: DataOption[];
}

export interface Option {
    name:  string;
    value: string;
}

export interface PartialChannel {
    id: string;
    name: string;
    type: number;
}

interface PartialMember {
    roles:         string[];
    premium_since: null;
    permissions:   string;
    pending:       boolean;
    nick:          null;
    joined_at:     string;
    is_pending:    boolean;
}

export interface Member extends PartialMember {
    user:          User;
    mute:          boolean;
    deaf:          boolean;
}

export interface User {
    id:            string;
    username:      string;
    avatar:        string;
    discriminator: string;
    public_flags:  number;
}

// ! Generated by https://quicktype.io

export interface ButtonInteraction {
    version:        number;
    type:           number;
    token:          string;
    message:        message;
    member:         Member;
    id:             string;
    guild_id:       string;
    data:           ButtonData;
    channel_id:     string;
    application_id: string;
}

export interface ButtonData {
    custom_id:      string;
    component_type: number;
}

export interface MessageComponent {
    type:       number;
    components: ComponentComponent[];
}

export interface ComponentComponent {
    type:      number;
    label:     string;
    style:     number;
    custom_id: string;
}
