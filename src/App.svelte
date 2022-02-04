<script>
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
      message_class = "success";
      message = "You got it!";
      stats.wins += 1;
      update_date();
    } else {
      message_class = "error";
      message = "Nope, try again!";
      stats.losses += 1;
    }

    setTimeout(function () {
      message = "";
    }, 2500);
  }

  let date;
  let message = "";
  let message_class = "";

  let stats = {
    wins: 0,
    losses: 0,
  };

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
    {stats.wins} win{stats.wins === 1 ? "" : "s"} • 
    {stats.losses} loss{stats.losses === 1 ? "" : "es"}
    {#if message} • <span class={message_class}>{message}</span>{/if}
  </p>
</div>

<style>
  h1 {
    text-align: center;
  }

  button {
    display: block;
    width: 100%;
  }

  #content {
    display: block;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }
</style>
