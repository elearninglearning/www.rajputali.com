let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_Speak = new SpeechSynthesisUtterance(text);
    text_Speak.rate = 1;
    text_Speak.pitch = 1;
    text_Speak.volume = 1;
    text_Speak.lang ="hi=GB";
    window.speechSynthesis.speak(text_Speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("good morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("good afternoon sir");
    } else {
        speak("good evening sir");
    }
}

window.addEventListener('load',()=>{
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult=(event)=>{
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click",()=>{
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message){
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hi")){
        speak("Hello sir, what can I help you with? i am avalible for you");
    }else if(message.includes("who are you")){
        speak("I am a virtual assistant created by Rajput Ali.");
    }else if(message.includes("who is ali")){
        speak("Rajput Ali is a dedicated data science professional with a Master’s degree in Computer Science. With a strong academic foundation and expertise in data analysis, machine learning, and statistical modeling, Rajput specializes in transforming complex data into actionable insights.");
    }else if(message.includes("open youtube")){
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    }else if(message.includes("open google")){
    }else if(message.includes("can you hlep me ")){
        speak("yes sir i am avalible for you ");
        window.open("https://www.youtube.com/", "_blank");
    }else if(message.includes("open google")){
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    }else if(message.includes("open facebook")){
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    }else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    }else{
        let finalText = "This is what I found on the internet regarding " + message.replace("jarvis", ""); // Fixed line
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("jarvis", "")}`, "_blank");
    }
}
