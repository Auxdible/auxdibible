import { HighlightColor } from "@prisma/client";

export const highlightColors: {[k in HighlightColor]: { dark: string, light: string }} = {
    RED: {
        light: "red-400",
        dark: "red-600"
    },
    BLUE: {
        light: "blue-400",
        dark: "blue-600"
    },
    CYAN: {
        light: "cyan-400",
        dark: "cyan-600"
    },
    GREEN: {
        light: "green-400",
        dark: "green-600"
    },
    ORANGE: {
        light: "orange-400",
        dark: "orange-600"
    },
    PINK: {
        light: "pink-400",
        dark: "pink-600"
    },
    PURPLE: {
        light: "purple-400",
        dark: "purple-600"
    },
    YELLOW: {
        light: "yellow-400",
        dark: "yellow-600"
    }
}