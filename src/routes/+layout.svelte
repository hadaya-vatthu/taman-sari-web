<script lang="ts">
	import Navbar from "$lib/Navbar.svelte";
  
  export let title: string = 'Taman Sari'
</script>

<Navbar title={title}/>
<slot></slot>