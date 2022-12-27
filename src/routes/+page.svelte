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

  let userName = data?.searchParams?.userName;

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
    console.log('event is:', event, dataSvg);

    const blob = await rasterize(dataSvg);
    console.log(`got blob:`, blob);
    const blobUrl = URL.createObjectURL(blob);
    console.log('got blobUrl:', blobUrl);

    const link = document.createElement('a');
    link.download = `untitled.png`;
    link.href = blobUrl;
    link.click();
    URL.revokeObjectURL(blobUrl);

    // (in promise) Unable to find element in cloned iframe
    // html2canvas(dataSvg).then((canvas) => { console.log('got canvas:', canvas); });
  }
</script>

<main style="max-width: 800px; margin: 0 auto;">
  <h1>Welcome to User Data of The Year 2022</h1>

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
            name="keyWords"
            placeholder="我的年度創作關鍵字是"
            value="Web3-Matters"
          />
        </label>
      </div>
    </div>
    <button type="submit">Submit</button>
    <button on:click={downloadAsPng}>Download</button>
  </form>

  <DataSvg userData={data} bind:el={dataSvg} />
</main>

<style>
  form {
    margin-bottom: 1rem;
  }
  form .row {
    display: flex;
  }
  form button[type='submit'] {
    display: none;
  }
  form div.field {
    max-width: 40rem;
    padding-right: 2rem;
  }
  form div.field label {
    width: 10rem;
  }
</style>
