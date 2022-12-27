<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import html2canvas from 'html2canvas';

  import { relativeAge, nFmt, imgToCanvas, serialize, rasterize, defaultImg } from '$lib/utils';
  import { download } from '$lib/dom-download.js';

  import DataSvg from '$lib/components/data-svg.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  // const width = 800;
  // const yearKeywords = 'Web3-Matters';

  // $: userData = data;

  let userName = data?.searchParams?.userName ?? 'hi176';
  let yearKeywords = data?.searchParams?.yearKeywords ?? 'Web3-Matters';

  // let avatarImg = defaultImg;

  let aDownload;
  let dataSvg;

  onMount(() => {
    (async function () {
      // avatarImg = userData?.data?.avatar ? (await imgToCanvas(userData.data.avatar)).toDataURL() : defaultImg;
      // console.log('dom is:', download);
      // aDownload = download(() => ({}), undefined, 'Save as PNG');
      // console.log('aDownload is:', aDownload);
    })();
  });

  async function downloadAsPng(event) {
    console.log('event is:', event, dataSvg, data);

    const blob = await rasterize(dataSvg, { scale: 1.25 });
    console.log(`got blob:`, blob);
    const blobUrl = URL.createObjectURL(blob);
    console.log('got blobUrl:', blobUrl);

    const link = document.createElement('a');
    link.download = `${data?.data?.displayName ?? 'untitled'}-${yearKeywords}-${
      data?.data?.year ?? 2022
    }.png`;
    link.href = blobUrl;
    link.click();
    URL.revokeObjectURL(blobUrl);

    // (in promise) Unable to find element in cloned iframe
    // html2canvas(dataSvg).then((canvas) => { console.log('got canvas:', canvas); });
  }
</script>

<main style="max-width: 800px; margin: 0 auto;">
  <h1>歡迎使用 Matters.News 年度數據 看板</h1>

  <form>
    <div class="row">
      <div class="field">
        <label
          >用戶名 (@userName)
          <input
            type="text"
            name="userName"
            placeholder="Enter your Matters.News @userName"
            bind:value={userName}
          />
        </label>
      </div>
      <div class="field">
        <label
          >年度創作關鍵字
          <input
            type="text"
            name="yearKeywords"
            placeholder="我的年度創作關鍵字是"
            bind:value={yearKeywords}
          />
        </label>
      </div>
      <button type="submit">Enter</button>
    </div>
  </form>
  <div class="download-links">
    <button on:click={downloadAsPng}>下載截圖</button>
  </div>

  <DataSvg userData={data} {yearKeywords} bind:el={dataSvg} />
</main>

<style>
  h1 {
    text-align: center;
  }
  form {
    margin-bottom: 1rem;
  }
  form .row {
    display: flex;
  }
  form button[type='submit'] {
    display: inline-block;
  }
  form div.field {
    min-width: 20rem;
    padding-right: 2rem;
  }
  form div.field label {
    width: 10rem;
  }

  .download-links {
    margin-bottom: 1rem;
  }
</style>
