import * as toxicity from '@tensorflow-models/toxicity';
import  express from 'express';
import cors from 'cors';
const app = express();



// ADD THIS

app.use(cors());


app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

app.get('/AI/', (req, res) => {

    var sentence = req.originalUrl.split('=')[1].replace('+',' ');
    console.log(sentence);

    console.log("AI");
    // The minimum prediction confidence.
    const threshold = 0.9;

    // Which toxicity labels to return.
    const labelsToInclude = ['toxicity','severe_toxicity','identity_attack', 'insult', 'threat','sexual_explicit','obscene'];
    console.log("yarin");
    var ans = false;

    toxicity.load(threshold, labelsToInclude).then(model => {
        // Now you can use the `model` object to label sentences. 
        model.classify([sentence]).then(predictions => 
            {
                
                for(var i=0;i<predictions.length;i++)
                {
                    console.log(predictions[i].results[0].match);
                    if(predictions[i].results[0].match==true){
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
        console.log("load "+error);
    });


});


