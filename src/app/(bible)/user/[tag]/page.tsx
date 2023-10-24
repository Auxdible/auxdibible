"use client";

import { UserProfile } from "@/components/user/UserProfile";




export default function UserInfoPage({ params }: { params: { tag: string }}) {
    
    return (<UserProfile tag={params.tag}/>);
}