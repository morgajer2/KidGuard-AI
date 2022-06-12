import * as toxicity from '@tensorflow-models/toxicity';
import express from 'express';
import cors from 'cors';
import utf8 from 'utf8';
const app = express();

import Tesseract from 'tesseract.js';


app.use(cors());


app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);

app.get('/AI/', (req, res) => {

    const url = req.originalUrl.split('=')[1];
    console.log(url);
    const decodedURL = unescape(url);
    console.log(decodedURL);


    //get text from the image
    Tesseract.recognize(
        decodedURL,
        'eng'
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
                console.log("Final decision: " + ans);
                res.send(ans);

            })
                .catch(function (error) {
                    console.log(error);
                });
        }).catch(function (error) {
            console.log("load " + error);
        });
    }).catch((error) => {
        console.log(error);
    });






});


