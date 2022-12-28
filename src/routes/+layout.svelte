<script>
  import { title, description, keywords, canonicalUrl } from '$lib/consts';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords.join(',')} />
  <meta property="og:image" content="/screenshot.png" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta property="twitter:image" content="/screenshot.png" />
</svelte:head>

<slot />
