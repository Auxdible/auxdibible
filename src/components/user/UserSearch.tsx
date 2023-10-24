"use client";

import { useQuery } from "react-query";
import { useState } from "react";
import { UserData } from "@/types/UserData";
import { MiniProfile } from "./MiniProfile";
import { BsSearch } from "react-icons/bs";
export function UserSearch() {
    const [search, setSearch] = useState<string>('');

    const { data, status, error } = useQuery<UserData[] | undefined>(['search', search],  async () => {
        return await fetch(`/api/users?search=${search}`).then(async (data) => await data.json().then((i) => {
            const response = i.users as UserData[];
            return response;
        })).catch(() => undefined);
    }, {
        enabled: !!search
    });
    return (<div className={"flex flex-col gap-2 py-2"}>
        <span className={"flex justify-between items-center p-2 gap-2 dark:bg-neutral-600 bg-neutral-300 rounded-2xl"}>
            <input className={"bg-transparent border-0 w-full focus:border-0 font-montserrat"} placeholder={"Search for users..."} value={search} onChange={(e) => setSearch(e.currentTarget.value)}/>
            <BsSearch className={""}/></span>
        {data ? 
        <ul className={"overflow-y-scroll"}>
            {data.map((user) => <MiniProfile key={user.tag} name={user.name} tag={user.tag} imageURL={user.image} />)}
        </ul> :
        ""}
    </div>);
}