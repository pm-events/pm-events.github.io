# How to contribute
1. Edit *only* **rumors.js** and **announced.js**.
2. **rumors.js** works for the ongoing page too, so add everything in there even if already in **announced.js**.
3. Dates must follow the **UTC Timezone**, so using the dates from the **#datamine-discoveries** channel is the way (they are always in UTC).
4. In **announced.js** you will only add **date**, no **expires** since the ongoing page only works from the **rumors.js**, **date** can be *TBA*, since sometimes the announcements have no date.
5. For grid and EX icons, use \[grid] - \[ex] - \[gridEX], depending on what they have, eg. *Sygna Suit Red & Charizard\[gridEX] Pokéfair Scout*.
6. Follow this layout for the events list:
```
///// rumors.js
export const rumors = [{
name: ["Event Name 1", "Event Name 2", "..."],
date: "January 23, 2021",
expires: "March 1, 2022"
},
{
name: ["Event name"],
date: "February 1, 2021",
expires: "February 13, 2021"
}]


///// announced.js
export const announced = [{
name: ["Event Name",
date: "TBA"
}]
```

#### If something breaks, you can ping @ ntcs#0900 on discord.
