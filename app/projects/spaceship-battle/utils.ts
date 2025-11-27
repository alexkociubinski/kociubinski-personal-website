
import React from 'react';

export interface AnsiSpan {
    text: string;
    style?: React.CSSProperties;
}

export function parseAnsi(text: string): AnsiSpan[] {
    const parts: AnsiSpan[] = [];
    const regex = /\u001b\[(\d+)(;\d+)*m/g;
    let lastIndex = 0;
    let match;
    let currentColor: string | undefined;

    // Map ANSI colors to CSS colors
    // 30-37 are standard foreground colors
    const colorMap: { [key: number]: string } = {
        30: '#000000', // Black
        31: '#ef4444', // Red (Tailwind red-500)
        32: '#22c55e', // Green (Tailwind green-500)
        33: '#eab308', // Yellow (Tailwind yellow-500)
        34: '#3b82f6', // Blue (Tailwind blue-500)
        35: '#d946ef', // Magenta (Tailwind fuchsia-500)
        36: '#06b6d4', // Cyan (Tailwind cyan-500)
        37: '#ffffff', // White
    };

    while ((match = regex.exec(text)) !== null) {
        // Text before the code
        if (match.index > lastIndex) {
            parts.push({
                text: text.substring(lastIndex, match.index),
                style: currentColor ? { color: currentColor } : undefined
            });
        }

        // Process the codes
        // The full match is like "\u001b[0;35m"
        // We need to extract the numbers.
        const sequence = match[0];
        // Remove \u001b[ and m, then split by ;
        const codes = sequence.slice(2, -1).split(';').map(c => parseInt(c, 10));

        for (const code of codes) {
            if (code === 0) {
                currentColor = undefined;
            } else if (code >= 30 && code <= 37) {
                currentColor = colorMap[code];
            }
        }

        lastIndex = regex.lastIndex;
    }

    // Remaining text
    if (lastIndex < text.length) {
        parts.push({
            text: text.substring(lastIndex),
            style: currentColor ? { color: currentColor } : undefined
        });
    }

    return parts;
}
