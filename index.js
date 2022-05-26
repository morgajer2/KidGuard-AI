import * as toxicity from '@tensorflow-models/toxicity';
import express from 'express';
import cors from 'cors';
const app = express();

import Tesseract from 'tesseract.js';


// ADD THIS

app.use(cors());


app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);

app.get('/AI/', (req, res) => {

    //get image url from request
    var imageUrl = req.originalUrl.split('=')[1].replaceAll('%2F','/');
    console.log(imageUrl);

    //get text from the image
    Tesseract.recognize(
        imageUrl,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);

        console.log("AI");
        // The minimum prediction confidence.
        const threshold = 0.9;

        // Which toxicity labels to return.
        const labelsToInclude = ['toxicity', 'severe_toxicity', 'identity_attack', 'insult', 'threat', 'sexual_explicit', 'obscene'];
        var ans = false;

        //checking if the words are bad
        toxicity.load(threshold, labelsToInclude).then(model => {
            model.classify([text]).then(predictions => {

                for (var i = 0; i < predictions.length; i++) {
                    console.log(predictions[i].results[0].match);
                    if (predictions[i].results[0].match == true) {
                        ans = true;
                        break;
                    }
                }
                res.send(ans);

            })
                .catch(function (error) {
                    console.log(error);
                });
        }).catch(function (error) {
            console.log("load " + error);
        });
    });






});


