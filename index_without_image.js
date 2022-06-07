import * as toxicity from '@tensorflow-models/toxicity';

import readline from 'readline-sync';

var input = readline.question('\nWhat sentence do you want to check? ');
console.log('\n- Received: ' + input+'\n');


console.log("Starting to analyze...");
// The minimum prediction confidence.
const threshold = 0.9;

// Which toxicity labels to return.
const labelsToInclude = ['toxicity', 'severe_toxicity', 'identity_attack', 'insult', 'threat', 'sexual_explicit', 'obscene'];
var ans = false;

//checking if the words are bad
toxicity.load(threshold, labelsToInclude).then(model => {
    model.classify([input]).then(predictions => {

        for (var i = 0; i < predictions.length; i++) {
            console.log(predictions[i].results[0].match);
            if (predictions[i].results[0].match == true) {
                ans = true;
                break;
            }
        }
        //res.send(ans);
        console.log("Final decision: " + ans)

    }).catch(function (error) {
        console.log(error);
    });
}).catch(function (error) {
    console.log("load " + error);
});



