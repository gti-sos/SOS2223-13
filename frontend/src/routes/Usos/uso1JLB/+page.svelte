<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
  
    let data = {};
  
    onMount(() => {
      fetch('https://timezone.abstractapi.com/v1/current_time/?api_key=d7717cab7b834e76a3778ad3dc2b2078&location=Madrid, Spain')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta, no fue ok');
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
        <h1>API: Time zone</h1>
      </blockquote>
    </figure>
    <ul>
        <li><strong>Dia y hora:</strong> {data.datetime}</li>
        <li><strong>Zona horaria:</strong> {data.timezone_name}</li>
        <li><strong>Desfase respecto GMT:</strong> {data.gmt_offset}<strong>h</strong></li>
        <li><strong>Ciudad:</strong> {data.requested_location}</li>
      </ul>
  </main>