const dictionary = require('./words.json');



// { "a": { "1": [1] }}
//
// { "1" }
// [[ [ 1 ],  ]
//
// [ @wordIndex => letterCounts ] [ ]
// [00111 = a1, b3
export default function(bag) {
    let words = []
    dictionary.forEach( (word, index) => {
        let counts = {}
        word.split('').forEach(letter => {
            if (!(letter in counts)) {
                counts[letter] = 0
            }
            counts[letter]++
        })

        for (const letter in counts) {
            if ((letter in bag) && counts[letter] <= bag[letter]) {
                words.push(word)
            }
        }

    })
    return words
};