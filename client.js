import { rumorstxt } from "./rumors.js"
import { announced } from "./announced.js"
let active;


document.getElementById("website").onclick = () => window.open("https://pokemonmasters-game.com/en-US");
document.getElementById("discord").onclick = () => window.open("https://discord.gg/pokemonmasters");
document.getElementById("reddit").onclick = () => window.open("https://www.reddit.com/r/PokemonMasters/");
document.getElementById("twitteren").onclick = () => window.open("https://twitter.com/PokemonMasters");
document.getElementById("twitterjp").onclick = () => window.open("https://twitter.com/pokemas_game");

if(window.matchMedia("(max-width: 1199px)").matches) {
  document.getElementsByClassName("dropdown")[0].onclick = () => {
    document.getElementsByClassName("dropdown-content")[0].style.display = "inline-block";
    document.getElementsByClassName("dropbtn")[0].style.backgroundColor = "grey";
  }
  window.onclick = (e) => {
  if(!e.target.className.includes("drop")) document.getElementsByClassName("dropdown-content")[0].style.display = "none";
  };
}

document.getElementById("rumors").onclick = () => {
  if (active) {
    document.getElementById(active).className = "";
    document.getElementById(active + "div").style.display = "none";
  }
  active = "rumors";
  document.getElementById("rumors").className = "active";
  setInterval(() => {
    const a = rumorstxt.split("UTC\n\n")
    const b = a.map(item =>item.replace("\n", ""))
    const rumors = b.map(event => {
      return {name: event.split("\n")[0],
        date: event.split("\n")[1].split("-").join("/"),
        expires: event.split("\n")[2] !== undefined ? event.split("\n")[2].split("-").join("/").split("-").join("/") : ""}
    })
    const events = rumors.filter(e => new Date(e.date).getTime() - Date.now() >= 0 || e.date === "TBA").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const nextEvents = events.filter(e => e.date === events[0].date);
    const futureEvents = events.filter(e => e.date !== events[0].date);
    document.getElementById("rumorstitles").innerHTML = nextEvents.length >= 1 ? "<b style=\"\">" + nextEvents.map(e => e.name.replace(/\[ex\]/g, "<img src=\"./ex.png\"/>").replace(/\[gridEX\]/g, "<img src=\"./grid.png\"/><img src=\"./ex.png\"/>")).join("<br>") + "</b>" : "No rumors yet.";
    document.getElementById("rumorsdate").innerHTML = nextEvents.length >= 1 ? nextEvents[0].date !== "TBA" ? "<span style=\"font-size:10px\"><i>" + new Date(nextEvents[0].date).toDateString() + "</i></span>" : null : null;
    const countdown = events.length >= 1 ? new Date(events[0].date).getTime() - Date.now() : null;
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    document.getElementById("rumorscountdown").innerHTML = nextEvents.length > 0 ? nextEvents[0].date !== "TBA" ? days >= 1 ? `${days}d ${hours}h ${minutes}m <span style="color:darkgrey">${seconds}</span>s` : hours >= 1 ? `${hours}h ${minutes}m <span style="color:darkgrey">${seconds}</span>s` : minutes >= 1 ? `${minutes}m <span style="color:darkgrey">${seconds}</span>s` : `<span style="color:darkgrey">${seconds}</span>s` : "TBA" : null;
    document.getElementById("futurerumors").innerHTML = nextEvents.length >= 1 ? futureEvents.map(e => e.name.replace(/\[grid\]/g, "<img src=\"./grid.png\"/>").replace(/\[ex\]/g, "<img src=\"./ex.png\"/>").replace(/\[gridEX\]/g, "<img src=\"./grid.png\"/><img src=\"./ex.png\"/>") + ` - <span style="color:darkgrey;">${new Date(e.date).toDateString()}</span>`).join("<br>") : null;
  }, 1000);
  document.getElementById("rumorsdiv").style.display = "inline-block";
}

document.getElementById("official").onclick = () => {
  if (active) {
    document.getElementById(active).className = "";
    document.getElementById(active + "div").style.display = "none";
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
    document.getElementById("officialcountdown").innerHTML = nextEvents.length > 0 ? nextEvents[0].date !== "TBA" ? days >= 1 ? `${days}d ${hours}h ${minutes}m <span style="color:darkgrey">${seconds}</span>s` : hours >= 1 ? `${hours}h ${minutes}m <span style="color:darkgrey">${seconds}</span>s` : minutes >= 1 ? `${minutes}m <span style="color:darkgrey">${seconds}</span>s` : `<span style="color:darkgrey">${seconds}</span>s` : "<span style=\"color:darkgrey\">Soon™</span>" : null;
    document.getElementById("futureofficial").innerHTML = nextEvents.length >= 1 ? futureEvents.map(e => e.name.map(n => `${n} - <span style="color:darkgrey;">${e.date !== "TBA" ? new Date(e.date + " 06:00:00 UTC").toDateString() : "Soon™"}</span>`)).flat().join("<br>") : null;
  }, 1000);
  document.getElementById("officialdiv").style.display = "inline-block";
}

document.getElementById("ongoing").onclick = () => {
  if (active) {
    document.getElementById(active).className = "";
    document.getElementById(active + "div").style.display = "none";
  }
  active = "ongoing";
  document.getElementById("ongoing").className = "active";
  setInterval(() => {
    const a = rumorstxt.split("UTC\n\n")
    const b = a.map(item =>item.replace("\n", ""))
    const rumors = b.map(event => {
      return {name: event.split("\n")[0],
        date: event.split("\n")[1].split("-").join("/"),
        expires: event.split("\n")[2] !== undefined ? event.split("\n")[2].split("-").join("/").split("-").join("/") : ""}
    })
    const events = rumors.filter(e => new Date(e.date).getTime() - Date.now() <= 0 && new Date(e.expires).getTime() >= Date.now());
    document.getElementById("ongoinglist").innerHTML = events.sort((a, b) => new Date(a.expires).getTime() - new Date(b.expires).getTime()).map(e => e.name.replace("[grid]", "<img src=\"./grid.png\"/>").replace("[ex]", "<img src=\"./ex.png\"/>").replace("[gridEX]", "<img src=\"./grid.png\"/><img src=\"./ex.png\"/>") +  ` - Ends on <span style="color:darkgrey;">${new Date(e.expires).toDateString()}</span>`).flat().join("<br>") || "No events running at the moment.";
  }, 1000);
  document.getElementById("ongoingdiv").style.display = "inline-block";
}
