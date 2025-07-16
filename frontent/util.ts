import { PluginSimple, PluginWithOptions } from 'markdown-it';
import { StateBlock, Token } from 'markdown-it/index.js';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getFormatedDateString = (dateIsoString: string): string => {
    const date = new Date(dateIsoString);

    const month = months[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${month} ${day}, ${year} ${hours}:${minutes}`;
}


export const customAbcPlugin: PluginSimple = (md) => {
    function customAbcBlock(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
        const startPos = state.bMarks[startLine] + state.tShift[startLine];
        const maxPos = state.eMarks[startLine];
        const line = state.src.slice(startPos, maxPos);

        const marker = '```abc[';
        if (!line.startsWith(marker)) return false;

        const endBracket = line.indexOf(']', marker.length);
        if (endBracket === -1) return false;

        const label = line.slice(marker.length, endBracket);

        let nextLine = startLine + 1;
        let found = false;

        while (nextLine < endLine) {
            const nextStart = state.bMarks[nextLine] + state.tShift[nextLine];
            const nextMax = state.eMarks[nextLine];
            const nextLineText = state.src.slice(nextStart, nextMax).trim();

            if (nextLineText === '```') {
                found = true;
                break;
            }

            nextLine++;
        }

        if (!found) return false;
        if (silent) return true;

        const content = state.getLines(startLine + 1, nextLine, state.tShift[startLine], false);

        const token = state.push('custom_abc_block', 'div', 0);
        token.block = true;
        token.info = label;
        token.content = content;
        token.map = [startLine, nextLine + 1];

        state.line = nextLine + 1;
        return true;
    }

    md.block.ruler.before('fence', 'custom_abc_block', customAbcBlock);

    md.renderer.rules['custom_abc_block'] = (tokens, idx) => {
        const token = tokens[idx];
        const label = token.info;
        const content = token.content;

        return `<div class="custom-abc" data-label="${md.utils.escapeHtml(label)}">
<pre>${md.utils.escapeHtml(content)}</pre>
</div>\n`;
    };
};


export function formatNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}
