<script>
  // import { onMount } from 'svelte';
  // import { browser } from '$app/environment';
  import { page } from '$app/stores';

  import { Telegram, Facebook, Twitter, Line } from 'svelte-share-buttons-component';

  // import html2canvas from 'html2canvas';

  import { title, description, keywords, canonicalOrigin } from '$lib/consts';
  import { rasterize } from '$lib/utils';
  // import { download } from '$lib/dom-download.js';

  import DataSvg from '$lib/components/data-svg.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let userName = data?.searchParams?.userName || 'hi176';
  let yearKeywords = data?.searchParams?.yearKeywords || 'Web3 Matters';

  const year = data?.data?.year ?? 2022;

  let dataSvgEl;

  async function downloadAsPng(event) {
    // console.log('event is:', event, dataSvgEl, data);

    const blob = await rasterize(dataSvgEl, { scale: 1.25 });
    // console.log(`got blob:`, blob);
    const blobUrl = URL.createObjectURL(blob);
    // console.log('got blobUrl:', blobUrl);

    const link = document.createElement('a');
    link.download = `${data?.data?.displayName ?? 'untitled'} ${yearKeywords} ${year}.png`;
    link.href = blobUrl;
    link.click();

    // always revoke, avoid leaking
    URL.revokeObjectURL(blobUrl);
  }

  $: shareUrl = `${canonicalOrigin}/${$page.url.search}`;
  $: updatedTitle =
    title.replace(/2022/, year) +
    (data?.data?.displayName ? ` - ${data.data.displayName.trim()}` : '');
</script>

<svelte:head>
  <title>{updatedTitle}</title>
  <meta name="description" content={description} />
  <meta
    name="keywords"
    content={[data?.data?.displayName?.trim()]
      .concat(keywords.map((k) => k.replaceAll(/2022/g, year)))
      .filter(Boolean)
      .join(',')}
  />
  <meta property="og:title" content={updatedTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={`${canonicalOrigin}/img/screenshot.png`} />
  <meta property="og:url" content={shareUrl} />
  <meta property="twitter:title" content={updatedTitle} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:image" content={`${canonicalOrigin}/img/screenshot.png`} />
  <meta property="twitter:url" content={shareUrl} />
  <meta property="meta:userDescription" content={`${data?.data?.displayName}`} />

  <link rel="canonical" href={shareUrl} />
</svelte:head>

<header>
  <h1>{title.replace(/2022/, year)}</h1>
  <p class="hint">
    溫馨提醒：想分享個人榜單，請下載圖片後用圖檔分享；直接分享網址不會顯示個人數據唷
  </p>
</header>

<main>
  <form>
    <div class="row">
      <label for="userName">用戶名 (@userName):</label>
      <input
        type="text"
        name="userName"
        id="userName"
        size={20}
        maxlength={20}
        placeholder="Enter your Matters.Town @userName"
        bind:value={userName}
      />
    </div>
    <div class="row">
      <label for="yearKeywords">年度創作關鍵字:</label>
      <input
        type="text"
        name="yearKeywords"
        id="yearKeywords"
        size={20}
        maxlength={20}
        placeholder="我的年度創作關鍵字是"
        bind:value={yearKeywords}
      />
    </div>

    <div class="row flex-1">
      <button type="submit" class="btn">Enter</button>
    </div>

    <div class="row flex-1">
      <div class="download-links">
        <button class="btn" on:click={downloadAsPng}>下載截圖</button>
      </div>
    </div>

    <div class="tools-group">
      <Twitter
        class="share-button"
        text={title}
        url={shareUrl}
        hashtags="2022馬特市創作成就"
        via="MattersLab"
        related="MattersLab"
      />
      <Facebook class="share-button" quote={title} url={shareUrl} />
      <Telegram class="share-button" text={title} url={shareUrl} />
      <Line class="share-button" url={shareUrl} />

      <a href="https://Matters.Town" target="_blank" rel="noreferrer" class="share-link"
        ><div>回到 Matters</div></a
      >
      <a
        href="https://matters.town/@hi176/355892-2022-馬特市年度問卷"
        target="_blank"
        rel="noreferrer"><div class="share-link">書寫馬特市年度問卷</div></a
      >
    </div>
  </form>

  <DataSvg userData={data} {yearKeywords} bind:el={dataSvgEl} />
</main>

<footer>
  © 2022 - 2023 Matters, Inc. All rights reserved. <a
    href="https://Matters.Town"
    target="_blank"
    rel="noreferrer">Matters.Town</a
  >
</footer>

<style>
  :global(body) {
    margin: 0;
  }
  main {
    margin: 0 auto;
  }
  @media (min-width: 1000px) {
    main {
      max-width: 1000px;
    }
  }

  header {
    text-align: center;
  }
  header h1 {
    white-space: nowrap;
  }
  header .hint {
    color: grey;
    margin-top: 0;
  }
  footer {
    color: grey;
  }
  footer * {
    color: inherit;
  }

  form {
    position: relative;
    padding-bottom: 4rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  #userName,
  #yearKeywords {
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  form .row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 0.5rem 0;
  }
  @media (min-width: 768px) {
    form {
      flex-direction: row;
      justify-content: space-evenly;
    }
    form .row {
      justify-content: center;
    }
  }

  form .row input {
    font-size: 1.1rem;
    padding: 0.25rem;
    border: 1px solid #ccc;
  }
  form .row input:focus {
    outline: none !important;
    border: 1px solid red;
    box-shadow: 0 0 10px #278e7b;
  }
  .flex-1 {
    flex: 0 0 100%;
  }

  form button[type='submit'] {
    display: block;
  }
  form div.row label {
    font-weight: bold;
    margin-right: 0.5rem;
    font-weight: bold;
    min-width: 10rem;
  }
  form div.row label:not(:first-of-type) {
    margin-left: 1rem;
  }

  button.btn {
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: white;
    color: black;
    padding: 0.5rem 1rem;
    font-size: 16px;
    cursor: pointer;

    width: 20rem;
    border-color: #ccc;
    color: #278e7b;
  }
  button.btn:hover {
    background-color: #278e7b;
    color: white;
  }

  .download-links {
    margin-bottom: 1rem;
  }

  .tools-group {
    position: absolute;
    right: 0;
    bottom: 0.25rem;

    margin: 0.5rem 0;
    padding-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .tools-group > :global(* + *) {
    margin-left: 0.5rem;
  }
  .tools-group :global(.share-button) {
    margin-left: 0.5rem;
  }
  .tools-group a.share-link {
    box-sizing: border-box;
    border: 1px dotted #grey;
  }

  footer {
    margin: 1rem 0;
    text-align: center;
    white-space: nowrap;
  }
</style>
