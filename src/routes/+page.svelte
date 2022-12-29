<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import { Telegram, Facebook, Twitter, Line } from 'svelte-share-buttons-component';

  // import html2canvas from 'html2canvas';

  import { title } from '$lib/consts';
  import { rasterize } from '$lib/utils';
  // import { download } from '$lib/dom-download.js';

  import DataSvg from '$lib/components/data-svg.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  // const width = 800;
  // const yearKeywords = 'Web3-Matters';

  // $: userData = data;

  let userName = data?.searchParams?.userName ?? 'hi176';
  let yearKeywords = data?.searchParams?.yearKeywords ?? 'Web3 Matters';

  // let avatarImg = defaultImg;

  let aDownload;
  let dataSvgEl;

  async function downloadAsPng(event) {
    // console.log('event is:', event, dataSvgEl, data);

    const blob = await rasterize(dataSvgEl, { scale: 1.25 });
    // console.log(`got blob:`, blob);
    const blobUrl = URL.createObjectURL(blob);
    // console.log('got blobUrl:', blobUrl);

    const link = document.createElement('a');
    link.download = `${data?.data?.displayName ?? 'untitled'} ${yearKeywords} ${
      data?.data?.year ?? 2022
    }.png`;
    link.href = blobUrl;
    link.click();

    // always revoke, avoid leaking
    URL.revokeObjectURL(blobUrl);
  }

  let shareUrl;
  $: if (browser) {
    shareUrl = `${window.location.origin}${window.location.pathname}?${new URLSearchParams({
      userName,
      yearKeywords
    }).toString()}`;
    console.log(`got url:`, { shareUrl });
  }
</script>

<main style="max-width: 800px; margin: 0 auto;">
  <h1>{title}</h1>

  <form>
    <div class="row">
      <label for="userName">用戶名 (@userName):</label>
      <input
        type="text"
        name="userName"
        id="userName"
        size={10}
        placeholder="Enter your Matters.News @userName"
        bind:value={userName}
      />
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

    <div class="row">
      <button type="submit" class="btn">Enter</button>
    </div>

    <div class="row">
      <div class="download-links">
        <button class="btn" on:click={downloadAsPng}>下載截圖</button>
      </div>
    </div>

    <div class="tools-group">
      <Twitter
        class="share-button"
        text={title}
        url={shareUrl}
        hashtags="馬特市創作成就,MattersLab"
        via="MattersLab"
        related="MattersLab"
      />
      <Facebook class="share-button" quote={title} url={shareUrl} />
      <Telegram class="share-button" text={title} url={shareUrl} />
      <Line class="share-button" url={shareUrl} />

      <a href="https://Matters.News" target="_blank" rel="noreferrer" class="share-link"
        ><div>回到 Matters</div></a
      >
      <a
        href="https://matters.news/@hi176/355892-2022-馬特市年度問卷"
        target="_blank"
        rel="noreferrer"><div class="share-link">書寫馬特市年度問卷</div></a
      >
    </div>
  </form>

  <DataSvg userData={data} {yearKeywords} bind:el={dataSvgEl} />
</main>

<footer>
  © 2022 Matters, Inc. All rights reserved. <a href="https://Matters.News">Matters.News</a>
</footer>

<style>
  h1 {
    text-align: center;
  }
  form {
    margin-bottom: 4rem;
    padding-bottom: 1rem;
  }

  #userName {
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }
  #yearKeywords {
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  form .row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 0.5rem 0;
    width: 100%;
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

  form button[type='submit'] {
    display: block;
  }
  form div.row label {
    font-weight: bold;
    margin-right: 0.5rem;
    font-weight: bold;
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
    right: 10rem;

    margin: 0.5rem 0;
    margin-top: -2rem;
    margin-right: -2rem;
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
  }
</style>
