'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        let speech = "Préferez-vous prendre la porte bleu ou la porte rouge ?";
        let reprompt = "Vous avez deux options, la bleu ou la rouge.";
        this.ask(speech, reprompt);
    },

    EnterDoorIntent() {
        let speech = '';
        let reprompt = '';
        if(this.$inputs.color.value === 'bleu' || this.$inputs.color.value === 'rouge') {
            speech = `Vous avez choisi la porte ${this.$inputs.color.value}.`;
            this.ask(speech);
        } else {
            speech = 'Veuillez choisir la couleur de la porte, bleu ou rouge ?';
            reprompt = 'La porte bleu ou la porte rouge.';
            this.ask(speech, reprompt);
        }
        
    },
    
   
});

module.exports.app = app;
