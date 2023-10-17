import { Dispatch, SetStateAction, createContext } from "react";
import { BibleContextType } from "../types/BibleContextType";

const BibleContext = createContext<{ bible: BibleContextType | undefined, setBible: Dispatch<SetStateAction<BibleContextType | undefined>>} | null>(null);

export default BibleContext;