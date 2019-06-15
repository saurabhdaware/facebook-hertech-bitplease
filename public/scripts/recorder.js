let teacher = 'Prof. Sam Smith';

var config = {
    apiKey: "AIzaSyDoznUY43-lKeZ30YQrx_eStW4RHg6JSh4",
    authDomain: "link-referral.firebaseapp.com",
    databaseURL: "https://link-referral.firebaseio.com",
    storageBucket: "link-referral.appspot.com"
};
firebase.initializeApp(config);

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = '';
let recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
recognition.onresult = (event) => {
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript = transcript;
        }
    }
    if(finalTranscript.includes('read')){
        let book = finalTranscript.slice(finalTranscript.indexOf('read')+finalTranscript.length);
        firebase.database().ref('cmd/read').set(book);
    }
}
recognition.start();
