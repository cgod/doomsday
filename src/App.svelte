<script>
  import { stats } from './store.js';
  import { Body } from 'svelte-body';

  let days = [
    { name: "Sunday", index: 0 },
    { name: "Monday", index: 1 },
    { name: "Tuesday", index: 2 },
    { name: "Wednesday", index: 3 },
    { name: "Thursday", index: 4 },
    { name: "Friday", index: 5 },
    { name: "Saturday", index: 6 },
  ];

  function generate_date() {
    let earliest = new Date(1900, 1, 1);
    let latest = new Date(2100, 1, 1);
    let rand = Math.random() * (latest - earliest);
    let new_date = new Date(earliest.valueOf() + rand);
    return new_date;
  }

  function update_date() {
    date = generate_date();
  }

  function guess(idx) {
    if (date.getDay() == idx) {
      body_class = "right-answer";
      $stats.wins += 1;
      update_date();
    } else {
      body_class = "wrong-answer";
      $stats.losses += 1;
    }

    setTimeout(function () {
      body_class = "";
    }, 500);

    // seven sundays in a row will reset stats
    if(idx == 0) sundays += 1;
    else sundays = 0;

    if(sundays == 7) {
      sundays = 0;
      $stats.wins = 0;
      $stats.losses = 0;
    }
  }

  let date;
  let body_class = "";
  let sundays = 0;

  update_date();

  $: date_formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
</script>

<div id="content">
  <h1>{date_formatted}</h1>

  {#each days as day}
    <button on:click={() => guess(day.index)}>
      {day.name}
    </button>
  {/each}

  <p>
    {$stats.wins} win{$stats.wins === 1 ? "" : "s"} • 
    {$stats.losses} loss{$stats.losses === 1 ? "" : "es"}
  </p>
</div>

<Body class={body_class} />

<style>
  h1 {
    text-align: center;
  }

  button {
    display: block;
    width: 100%;
    height: 3rem;
  }

  #content {
    display: block;
    width: 75%;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

</style>
