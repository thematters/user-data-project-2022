<script>
  // import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // import qr from 'qrcodejs';
  import QRCode from 'qrcode';

  // console.log('what is:', typeof QRCode, QRCode, Object.keys(QRCode));

  import { relativeAge, nFmt, loadImageToDataUri, defaultImg } from '$lib/utils';

  export let yearKeywords = 'Web3-Matters';

  /** @type {import('./$types').PageData} */
  export let userData;
  export let el;

  let mattersQrCodeUri;
  $: if (browser) {
    QRCode.toDataURL('https://matters.news', { margin: 0 }).then((datauri) => {
      mattersQrCodeUri = datauri;
    });
  }

  let localQrCodeUri;
  $: if (browser) {
    QRCode.toDataURL(window.location.href, {
      margin: 0
    }).then((datauri) => {
      localQrCodeUri = datauri;
    });
  }

  let userImgDataUri;
  $: if (browser) {
    loadImageToDataUri(userData?.data?.avatar).then((dataUri) => {
      userImgDataUri = dataUri;
    });
  }
</script>

<svg
  width={800}
  height={800}
  viewBox="0 0 1000 1000"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  bind:this={el}
>
  <g xmlns="http://www.w3.org/2000/svg" clip-path="url(#clip0_578_5)">
    <rect width="1000" height="1000" fill="#114C41" />
    <path
      d="M570 0H0V508.5C21.8333 402.667 107.5 198 275.5 226C443.5 254 585 138.5 570 0Z"
      fill="#0E3830"
    />
    <path
      d="M0 0H1000V201C1000 223.091 982.091 241 960 241H40C17.9086 241 0 223.091 0 201V0Z"
      fill="url(#paint0_linear_578_5)"
    />
    <path
      d="M430.093 999.5L1000.09 999.5L1000.09 491C978.26 596.833 892.593 801.5 724.593 773.5C556.593 745.5 415.093 861 430.093 999.5Z"
      fill="#0E3830"
    />
    <text
      fill="#FFEB97"
      font-size="40"
      font-weight="bold"
      letter-spacing="0.05em"
      text-anchor="middle"
      ><tspan x="500" y="90.2">{userData?.data?.displayName?.trim() || '未找到作者'}</tspan></text
    >
    <text fill="white" font-size="32" font-weight="bold" letter-spacing="0.05em"
      ><tspan x="315.241" y="145.16">馬特市 {userData?.data?.year ?? 2022} 年成就榜單</tspan></text
    >
    <path d="M50 133H257.5" stroke="white" stroke-width="1.5" />
    <path d="M742 133H949.5" stroke="white" stroke-width="1.5" />
    <rect x="50" y="182" width="900" height="240" rx="40" fill="#F7F8F0" />
    <rect x="70" y="202" width="200" height="200" rx="32" fill="url(#pattern0)" />
    <rect x="345" y="232" width="510" height="32" fill="#FFEB97" />
    <text
      font-size="40"
      font-weight="bold"
      letter-spacing="0em"
      x="600"
      y="247.2"
      text-anchor="middle"
    >
      <tspan fill="#114C41">進駐馬特市已經</tspan>
      <tspan fill="#19C0A0">{relativeAge(userData?.data?.createdAt)}</tspan>
    </text>
    <text font-size="40" font-weight="bold" letter-spacing="0em" />

    <text fill="#114C41" font-size="32" letter-spacing="0em"
      ><tspan x="424" y="320.16">我的年度創作關鍵字是：</tspan></text
    >
    <text
      letter-spacing="0em"
      font-size="40"
      font-weight="bold"
      x="600"
      y="387.2"
      text-anchor="middle"
    >
      <tspan fill="#FFEB97" font-size="60" alignment-baseline="middle">“</tspan>
      <tspan fill="#19C0A0">{yearKeywords}</tspan>
      <tspan fill="#FFEB97" font-size="60" alignment-baseline="middle">”</tspan>
    </text>

    <rect x="50" y="446" width="900" height="384" rx="40" fill="#F7F8F0" />
    <rect x="87" y="494" width="826" height="32" fill="#FFEB97" />
    <text fill="#114C41" font-size="40" font-weight="bold" letter-spacing="0em"
      ><tspan x="87" y="509.2"
        >{userData?.data?.year ?? 2022} 年，我在 Matters.News 完成了以下創舉</tspan
      ></text
    >
    <rect x="70" y="554" width="231" height="256" rx="32" fill="url(#paint1_linear_578_5)" />
    <path
      d="M112.72 593.2C115.284 594.186 115.284 597.814 112.72 598.8L98.0769 604.432C96.1119 605.188 94 603.737 94 601.632L94 590.368C94 588.263 96.1119 586.812 98.0769 587.568L112.72 593.2Z"
      fill="#FFEB97"
    />
    <text fill="white" font-size="24" font-weight="bold" letter-spacing="0em"
      ><tspan x="124" y="605.12">閱讀</tspan></text
    >
    <line x1="94" y1="621.5" x2="277" y2="621.5" stroke="#FFEB97" stroke-dasharray="4 6" />
    <text>
      <tspan
        fill="#FFEB97"
        font-size={userData?.data?.numReadings > 10e3 ? 32 : 40}
        font-weight="bold"
        letter-spacing="0em"
        x="94.1914"
        y="665.2">{nFmt(userData?.data?.numReadings)}</tspan
      >
      <tspan fill="white" font-size="24" y="659.12">篇文章</tspan>
    </text>

    <path
      d="M112.72 709.2C115.284 710.186 115.284 713.814 112.72 714.8L98.0769 720.432C96.1119 721.188 94 719.737 94 717.632L94 706.368C94 704.263 96.1119 702.812 98.0769 703.568L112.72 709.2Z"
      fill="#FFEB97"
    />
    <text fill="white" font-size="24" font-weight="bold" letter-spacing="0em"
      ><tspan x="124" y="721.12">創作</tspan></text
    >
    <line x1="94" y1="737.5" x2="277" y2="737.5" stroke="#FFEB97" stroke-dasharray="4 6" />
    <text xml:space="preserve" letter-spacing="0em">
      <tspan fill="#FFEB97" font-size="40" font-weight="bold" x="94.1914" y="781.2"
        >{nFmt(userData?.data?.numWritings)}</tspan
      >
      <tspan fill="white" font-size="24" y="775.12">篇作品</tspan>
    </text>

    <rect x="372.5" y="554" width="231" height="256" rx="32" fill="url(#paint2_linear_578_5)" />
    <path
      d="M415.22 593.2C417.784 594.186 417.784 597.814 415.22 598.8L400.577 604.432C398.612 605.188 396.5 603.737 396.5 601.632L396.5 590.368C396.5 588.263 398.612 586.812 400.577 587.568L415.22 593.2Z"
      fill="#FFEB97"
    />
    <text fill="white" xml:space="preserve" font-size="24" font-weight="bold" letter-spacing="0em"
      ><tspan x="426.5" y="605.12">支持</tspan></text
    >
    <line x1="396.5" y1="621.5" x2="579.5" y2="621.5" stroke="#FFEB97" stroke-dasharray="4 6" />
    <text xml:space="preserve" letter-spacing="0em">
      <tspan fill="#FFEB97" font-size="40" font-weight="bold" x="396.691" y="665.2"
        >{nFmt(userData?.data?.numDonatedArticles)}</tspan
      >
      <tspan fill="white" font-size="24" y="659.12">篇文章</tspan>
    </text>

    <path
      d="M415.22 709.2C417.784 710.186 417.784 713.814 415.22 714.8L400.577 720.432C398.612 721.188 396.5 719.737 396.5 717.632L396.5 706.368C396.5 704.263 398.612 702.812 400.577 703.568L415.22 709.2Z"
      fill="#FFEB97"
    />
    <text fill="white" xml:space="preserve" font-size="24" font-weight="bold" letter-spacing="0em"
      ><tspan x="426.5" y="721.12">拍手</tspan></text
    >
    <line x1="396.5" y1="737.5" x2="579.5" y2="737.5" stroke="#FFEB97" stroke-dasharray="4 6" />
    <text xml:space="preserve" letter-spacing="0em">
      <tspan
        fill="#FFEB97"
        font-size={userData?.data?.numAppreciatedArticles > 10e3 ? 32 : 40}
        font-weight="bold"
        x="396.691"
        y="781.2">{nFmt(userData?.data?.numAppreciatedArticles)}</tspan
      >
      <tspan fill="white" font-size="24" y="775.12">篇文章</tspan>
    </text>

    <rect x="675" y="554" width="255" height="256" rx="32" fill="url(#paint3_linear_578_5)" />
    <path
      d="M717.72 593.2C720.284 594.186 720.284 597.814 717.72 598.8L703.077 604.432C701.112 605.188 699 603.737 699 601.632L699 590.368C699 588.263 701.112 586.812 703.077 587.568L717.72 593.2Z"
      fill="#FFEB97"
    />
    <text fill="white" xml:space="preserve" font-size="24" font-weight="bold" letter-spacing="0em"
      ><tspan x="729" y="605.12">追蹤</tspan></text
    >
    <line x1="699" y1="621.5" x2="882" y2="621.5" stroke="#FFEB97" stroke-dasharray="4 6" />
    <text xml:space="preserve" letter-spacing="0em">
      <tspan fill="#FFEB97" font-size="40" font-weight="bold" x="699.16" y="665.2"
        >{nFmt(userData?.data?.numFollowedAuthors)}</tspan
      >
      <tspan fill="white" font-size="24" y="659.12">位作者</tspan>
    </text>

    <path
      d="M717.72 709.2C720.284 710.186 720.284 713.814 717.72 714.8L703.077 720.432C701.112 721.188 699 719.737 699 717.632L699 706.368C699 704.263 701.112 702.812 703.077 703.568L717.72 709.2Z"
      fill="#FFEB97"
    />
    <text fill="white" xml:space="preserve" font-size="24" font-weight="bold" letter-spacing="0em"
      ><tspan x="729" y="721.12">留下</tspan></text
    >
    <line x1="699" y1="737.5" x2="882" y2="737.5" stroke="#FFEB97" stroke-dasharray="4 6" />
    <text xml:space="preserve" letter-spacing="0em">
      <tspan fill="#FFEB97" font-size="40" font-weight="bold" x="699.16" y="781.2"
        >{nFmt(userData?.data?.numComments)}</tspan
      >
      <tspan fill="white" font-size="24" y="775.12">條評論</tspan>
    </text>

    <g clip-path="url(#clip5_578_5)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M186.424 921C181.462 921 177.757 917.706 177.757 913.709H183.014C183.059 915.192 184.566 916.257 186.503 916.257C188.565 916.257 189.868 915.272 189.868 913.789C189.868 911.898 187.806 911.479 185.699 910.947C181.326 909.872 178.21 908.106 178.21 903.951C178.21 900.045 181.824 896.989 186.583 896.989C191.341 896.989 194.955 900.079 194.955 904.109L189.698 904.064C189.698 902.536 188.225 901.675 186.583 901.675C184.94 901.675 183.467 902.502 183.467 903.894C183.467 905.581 185.484 905.989 187.591 906.532C190.706 907.313 195 908.343 195 913.698C195.011 917.751 191.137 921 186.424 921V921ZM164.004 920.253V897.498H177.757V902.309H169.204V920.242H164.004V920.253V920.253ZM142.252 906.747H156.006C155.541 903.883 152.811 901.494 149.106 901.494C145.402 901.494 142.637 903.713 142.252 906.747ZM149.129 921C142.037 921 136.508 915.566 136.508 908.898C136.508 902.23 142.048 897 149.129 897C156.209 897 161.749 902.23 161.749 909.057C161.749 909.43 161.704 910.087 161.579 910.698H142.116C142.705 913.823 145.685 916.177 149.208 916.177C151.972 916.177 154.284 914.898 155.371 912.6H161.16C159.54 917.502 154.918 921 149.129 921ZM95.9618 916.245C100.131 916.245 103.008 913.121 103.008 909C103.008 904.879 100.131 901.755 95.9618 901.755C91.7927 901.755 89.0058 904.834 89.0058 909C89.0058 913.166 91.838 916.245 95.9618 916.245ZM95.0895 921C88.5639 921 83.7491 915.657 83.7491 909C83.7491 902.343 88.5753 897 95.0895 897C99.1566 897 102.317 899.174 103.767 902.174H103.937V897.657H109.001V920.377H103.937V915.94H103.767C101.774 919.517 98.7827 921 95.0895 921V921ZM50 920.253V891H57.1486L65.1695 913.279H65.2942L73.3151 891H80.4977V920.253H75.3543V899.581H75.1844C74.9351 900.487 74.6859 901.483 74.2214 902.717L67.6733 920.253H62.8698L56.3103 902.717C55.8458 901.483 55.5625 900.487 55.3473 899.581H55.1774V920.253H50ZM123.253 897.43H126.573V891H131.818V897.43H135.511V902.253H131.818V915.419H135.387V920.242H126.573V902.264H119.56V915.43H123.129V920.253H114.315V902.264H110.746V897.442H114.315V891H119.56V897.43H123.253Z"
        fill="white"
      />
    </g>
    <rect x="219" y="862" width="88" height="88" rx="8" fill="white" />
    <rect x="223" y="866" width="80" height="80" fill="url(#pattern1)" />
    <text fill="white" xml:space="preserve" font-size="28" font-weight="bold" letter-spacing="0em"
      ><tspan x="407" y="916.64">獲取個人年度榜單</tspan></text
    >
    <rect x="655" y="862" width="88" height="88" rx="8" fill="white" />
    <rect x="659" y="866" width="80" height="80" fill="url(#pattern2)" />
    <g clip-path="url(#clip6_578_5)">
      <path
        d="M907.314 946C925.286 946 939.856 931.449 939.856 913.5C939.856 895.551 925.286 881 907.314 881C889.342 881 874.772 895.551 874.772 913.5C874.772 931.449 889.342 946 907.314 946Z"
        fill="#AF9A42"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M911.466 939.074C893.489 939.074 878.924 924.528 878.924 906.574C878.924 901.912 879.911 897.474 881.684 893.462C877.353 898.976 874.772 905.924 874.772 913.478C874.772 931.431 889.337 945.978 907.314 945.978C920.622 945.978 932.046 937.998 937.095 926.59C931.148 934.188 921.879 939.074 911.466 939.074V939.074Z"
        fill="#847122"
      />
      <path
        d="M949.798 895.614C948.451 891.355 940.843 889.562 929.936 890.145C930.363 890.548 930.744 890.974 931.148 891.4C940.417 891.041 946.746 892.633 947.89 896.219C948.9 899.424 945.601 903.66 939.385 908.076C931.911 913.388 920.219 918.947 906.528 923.25C896.452 926.41 886.869 928.405 878.834 929.19C866.917 930.378 858.456 928.943 857.132 924.729C855.673 920.112 863.124 913.343 875.445 907.022C875.558 906.44 875.737 905.879 875.872 905.319C862.002 912.29 853.541 920.022 855.202 925.334C856.728 930.176 866.289 931.857 879.575 930.445C887.632 929.593 897.058 927.621 906.91 924.528C920.286 920.336 931.821 914.89 939.587 909.533C946.993 904.422 950.965 899.402 949.776 895.614H949.798Z"
        fill="#E2CB6A"
      />
    </g>
    <g clip-path="url(#clip7_578_5)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M923.489 121.351C923.033 120.707 922 121.007 922 121.79V145.21C922 145.993 923.033 146.293 923.489 145.649C928.324 138.797 941.7 135.589 949.328 134.279C950.223 134.125 950.223 132.875 949.328 132.721C941.7 131.411 928.324 128.203 923.489 121.351Z"
        fill="white"
      />
    </g>
    <g clip-path="url(#clip8_578_5)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M76.5109 145.649C76.967 146.293 78 145.993 78 145.21L78 121.79C78 121.007 76.967 120.707 76.5109 121.351C71.676 128.203 58.2998 131.411 50.6722 132.721C49.7771 132.875 49.7771 134.125 50.6722 134.279C58.2998 135.589 71.676 138.797 76.5109 145.649Z"
        fill="white"
      />
    </g>
  </g>

  <defs xmlns="http://www.w3.org/2000/svg">
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="#image0_578_5"
        transform="scale(0.0025)"
      />
    </pattern>
    <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="#image1_578_5"
        transform="scale(0.000974659)"
      />
    </pattern>
    <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="#image1_578_6"
        transform="scale(0.000974659)"
      />
    </pattern>
    <linearGradient
      id="paint0_linear_578_5"
      x1="500"
      y1="275"
      x2="500"
      y2="1.90667e-06"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#278E7B" />
      <stop offset="1" stop-color="#17C3A3" />
    </linearGradient>
    <linearGradient
      id="paint1_linear_578_5"
      x1="79"
      y1="799"
      x2="314.5"
      y2="560"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#278E7B" />
      <stop offset="1" stop-color="#17C3A3" />
    </linearGradient>
    <linearGradient
      id="paint2_linear_578_5"
      x1="381.5"
      y1="799"
      x2="617"
      y2="560"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#278E7B" />
      <stop offset="1" stop-color="#17C3A3" />
    </linearGradient>
    <linearGradient
      id="paint3_linear_578_5"
      x1="684.935"
      y1="799"
      x2="918.949"
      y2="536.834"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#278E7B" />
      <stop offset="1" stop-color="#17C3A3" />
    </linearGradient>
    <clipPath id="clip0_578_5">
      <rect width="1000" height="1000" fill="white" />
    </clipPath>
    <clipPath id="clip1_578_5">
      <rect
        width="14.0593"
        height="19.75"
        fill="white"
        transform="translate(327.831 372.75) rotate(-180)"
      />
    </clipPath>
    <clipPath id="clip2_578_5">
      <rect
        width="14.0593"
        height="19.75"
        fill="white"
        transform="translate(303.059 372.75) rotate(-180)"
      />
    </clipPath>
    <clipPath id="clip3_578_5">
      <rect width="14.0593" height="19.75" fill="white" transform="translate(872 370)" />
    </clipPath>
    <clipPath id="clip4_578_5">
      <rect width="14.0593" height="19.75" fill="white" transform="translate(896.771 370)" />
    </clipPath>
    <clipPath id="clip5_578_5">
      <rect width="145" height="30" fill="white" transform="translate(50 891)" />
    </clipPath>
    <clipPath id="clip6_578_5">
      <rect width="95" height="65" fill="white" transform="translate(855 881)" />
    </clipPath>
    <clipPath id="clip7_578_5">
      <rect width="28" height="25" fill="white" transform="translate(922 121)" />
    </clipPath>
    <clipPath id="clip8_578_5">
      <rect width="28" height="25" fill="white" transform="translate(78 146) rotate(-180)" />
    </clipPath>
    <image
      id="image0_578_5"
      width="400"
      height="400"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xlink:href={userImgDataUri ?? defaultImg}
      preserveAspectRatio="xMinYMin slice"
    />
    <image
      id="image1_578_5"
      width="1026"
      height="1026"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xlink:href={mattersQrCodeUri || 'https://blaesus.github.io/matters-quote/assets/qrcode.png'}
    />
    <image
      id="image1_578_6"
      width="1026"
      height="1026"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xlink:href={localQrCodeUri || 'https://blaesus.github.io/matters-quote/assets/qrcode.png'}
    />
    <style>
      svg text {
        font-family: jf-jinxuan, 'genyogothictw', -apple-system, BlinkMacSystemFont, 'PingFang TC',
          'Helvetica Neue', 'Segoe UI', roboto, Arial, 'Microsoft YaHei', 'Source Han Sans TC',
          'Noto Sans CJK TC', 'WenQuanYi Micro Hei', sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }
    </style>
  </defs>
</svg>
