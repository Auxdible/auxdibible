import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function VersionSelector() {
    const searchParams = useSearchParams();
    const router = useRouter();
    return (
    <span>
        <select className={"text-2xl font-montserrat rounded-2xl bg-neutral-300 dark:bg-neutral-600 p-0.5"} 
        value={searchParams.get('version')?.toLowerCase() || 'kjv'} 
        onChange={(e) => router.push("?version="+e.currentTarget.value)}>
            <option value={'kjv'}>KJV</option>
            <option value={'bbe'}>BBE</option>
        </select>
    </span>
    );
}