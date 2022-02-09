import { writable } from "svelte/store";

let storedStats = localStorage.getItem("stats");
if(storedStats) storedStats = JSON.parse(storedStats);
else storedStats = { wins: 0, losses: 0 };

export const stats = writable(storedStats);

stats.subscribe(value => {
  localStorage.setItem("stats", JSON.stringify(value));
});
