<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { Table } from 'sveltestrap';

  let data = {};

  onMount(() => {
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=43546d5a1946432397aa20f1a9d0f488&fields=country,region,city,continent')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => data = json)
      .catch(err => console.error(err));
  });
</script>
<main>
  <figure class="text-center">
    <blockquote class="blockquote">
      <h1>API: IP Geolocation</h1>
    </blockquote>
  </figure>
  <Table bordered>
    <thead>
      <tr>
        <th>Ciudad:</th>
        <th>Region:</th>
        <th>País:</th>
        <th>Continente:</th>
      </tr>
    </thead>
    <tbody>
          <tr>
            <td>{data.city}</td>
            <td>{data.region}</td>
            <td>{data.country}</td>
            <td>{data.continent}</td>
          </tr>

    </tbody>
  </Table>
</main>
