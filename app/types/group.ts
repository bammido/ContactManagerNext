import { IContact } from "./contacts";

export interface IGroup {
    groupName: string;
    id: string;
}

export interface IGroupDetails extends IGroup {
    contacts: IContact[]
}