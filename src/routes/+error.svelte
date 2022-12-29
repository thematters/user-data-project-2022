<script>
  // import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    const timer = setTimeout(() => goto('/', { replaceState: true }), 0);
    return () => clearTimeout(timer);
  });
</script>
