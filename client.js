import { rumors } from "./rumors.js"
import { announced } from "./announced.js"
let active;


document.getElementById("website").onclick = () => window.open("https://pokemonmasters-game.com/en-US");
document.getElementById("discord").onclick = () => window.open("https://discord.gg/pokemonmasters");
document.getElementById("reddit").onclick = () => window.open("https://www.reddit.com/r/PokemonMasters/");
document.getElementById("twitteren").onclick = () => window.open("https://twitter.com/PokemonMasters");
document.getElementById("twitterjp").onclick = () => window.open("https://twitter.com/pokemas_game");

document.getElementById("rumors").onclick = () => {
  if(active) {
    document.getElementById(active).className = "";
    document.getElementById(active+"div").style.display = "none";
  }
  active = "rumors";
  document.getElementById("rumors").className = "active";
  setInterval(() => {
    const events = rumors.filter(e => new Date(e.date + " 06:00:00 UTC").getTime() - Date.now() >= 0 || e.date === "TBA");
    const nextEvents = events.filter(e => e.date === events[0].date);
    const futureEvents = events.filter(e => e.date !== events[0].date);
    document.getElementById("rumorstitles").innerHTML = nextEvents.length >= 1 ? "<b style=\"\">" + nextEvents.map(e => e.name).flat().join("<br>") + "</b>" : "No rumors yet.";
    document.getElementById("rumorsdate").innerHTML = nextEvents.length >= 1 ? nextEvents[0].date !== "TBA" ? "<span style=\"font-size:10px\"><i>" + new Date(nextEvents[0].date + " 06:00:00 UTC").toDateString() + "</i></span>" : null : null;
    const countdown = events.length >= 1 ? new Date(events[0].date + " 06:00:00 UTC").getTime() - Date.now() : null;
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    document.getElementById("rumorscountdown").innerHTML = nextEvents.length > 0 ? nextEvents[0].date !== "TBA" ? days >= 1 ? `${days}d ${hours}h ${minutes}m <span style="color:#ffc361">${seconds}</span>s` : hours >= 1 ? `${hours}h ${minutes}m <span style="color:#ffc361">${seconds}</span>s` : minutes >=1 ? `${minutes}m <span style="color:#ffc361">${seconds}</span>s` : `<span style="color:#ffc361">${seconds}</span>s` : "TBA" : null;
    document.getElementById("futurerumors").innerHTML = nextEvents.length >= 1 ? futureEvents.map(e => e.name.map(n => `${n} - <span style="color:#ffc361;">${new Date(e.date + " 06:00:00 UTC").toDateString()}</span>`)).flat().join("<br>") : null;
  }, 1000);
  document.getElementById("rumorsdiv").style.display = "inline-block";
}

document.getElementById("official").onclick = () => {
  if(active) {
    document.getElementById(active).className = "";
    document.getElementById(active+"div").style.display = "none";
  }
  active = "official";
  document.getElementById("official").className = "active";
  setInterval(() => {
    const events = announced.filter(e => new Date(e.date + " 06:00:00 UTC").getTime() - Date.now() >= 0 || e.date === "TBA");
    const nextEvents = events.filter(e => e.date === events[0].date);
    const futureEvents = events.filter(e => e.date !== events[0].date);
    document.getElementById("officialtitles").innerHTML = nextEvents.length >= 1 ? "<b style=\"\">" + nextEvents.map(e => e.name).flat().join("<br>") + "</b>" : "No announcement yet.";
    document.getElementById("officialdate").innerHTML = nextEvents.length >= 1 ? nextEvents[0].date !== "TBA" ? "<span style=\"font-size:10px\"><i>" + new Date(nextEvents[0].date + " 06:00:00 UTC").toDateString() + "</i></span>" : null : null;
    const countdown = events.length >= 1 ? new Date(events[0].date + " 06:00:00 UTC").getTime() - Date.now() : null;
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    document.getElementById("officialcountdown").innerHTML = nextEvents.length > 0 ? nextEvents[0].date !== "TBA" ? days >= 1 ? `${days}d ${hours}h ${minutes}m <span style="color:#ffc361">${seconds}</span>s` : hours >= 1 ? `${hours}h ${minutes}m <span style="color:#ffc361">${seconds}</span>s` : minutes >=1 ? `${minutes}m <span style="color:#ffc361">${seconds}</span>s` : `<span style="color:#ffc361">${seconds}</span>s` : "<span style=\"color:#ffc361\">Soon™</span>" : null;
    document.getElementById("futureofficial").innerHTML = nextEvents.length >= 1 ? futureEvents.map(e => e.name.map(n => `${n} - <span style="color:#ffc361;">${e.date !== "TBA" ? new Date(e.date + " 06:00:00 UTC").toDateString() : "Soon™"}</span>`)).flat().join("<br>") : null;
  }, 1000);
  document.getElementById("officialdiv").style.display = "inline-block";
}

document.getElementById("ongoing").onclick = () => {
  if(active) {
    document.getElementById(active).className = "";
    document.getElementById(active+"div").style.display = "none";
  }
  active = "ongoing";
  document.getElementById("ongoing").className = "active";
  setInterval(() => {
    const events = rumors.filter(e => new Date(e.date + " 06:00:00 UTC").getTime() - Date.now() <= 0 && new Date(e.expires + " 06:00:00 UTC").getTime() >= Date.now());
    document.getElementById("ongoinglist").innerHTML = events.sort((a, b) => new Date(a.expires + " 06:00:00 UTC").getTime() - new Date(b.expires + " 06:00:00 UTC").getTime()).map(e => e.name.map(n => `${n} - Ends on <span style="color:#ffc361;">${new Date(e.expires + " 06:00:00 UTC").toDateString()}</span>`)).flat().join("<br>") || "No events running at the moment.";
  }, 1000);
  document.getElementById("ongoingdiv").style.display = "inline-block";
}

document.getElementById("utilities").onclick = () => {
  if(active) {
    document.getElementById(active).className = "";
    document.getElementById(active+"div").style.display = "none";
  }
  active = "utilities";
  document.getElementById("utilities").className = "active";
  document.getElementById("utilitiesdiv").style.display = "inline-block";
}
