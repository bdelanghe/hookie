const root = require('./trie.json');

const counter = (bag) => {
    let counts = Array(26).fill(0);
    const shift = 97;
    for (const [letter, count] of Object.entries(bag)) {
        counts[letter.charCodeAt(0) - shift] = count;
    };
    return counts;
}

export const words = (bag) => {
    let words = [];
    const counts = counter(bag);
    let to_check = [{"node": root, "countsIndex": 0}];
    while (to_check.length > 0) {
        const {node, countsIndex} = to_check.pop();
        if ('words' in node) {
            words.push(...node['words'])
        } else {
            const count = counts[countsIndex];
            for (n = 0; n <= count; n++) {
                if (n in node) {
                    to_check.push({"node": node[n], "countsIndex": countsIndex + 1})
                }
            }
        }
    }
    return words;
};