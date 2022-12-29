<script>
  import { title, description, canonicalUrl } from '$lib/consts';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="2022,2022Matters年度問卷,matters,matters.news,創作有價" />
  <meta property="og:image" content="%sveltekit.assets%/screenshot.png" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta property="twitter:image" content="%sveltekit.assets%/screenshot.png" />
</svelte:head>

<slot />
