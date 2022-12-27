import { loadUserData } from '$lib/utils';

import moment from 'moment';

/** @type {import('./$types').PageLoad} */
export async function load({ url, route, params, fetch }) {
  // console.log('from url:', url, Object.fromEntries(url.searchParams.entries()));
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const year =
    Number.parseInt(url.searchParams.get('year'), 10) ||
    // when in Januaray or Feburary, shows prior year instead;
    moment().subtract(2, 'months').startOf('month').year();

  return {
    // year,
    searchParams, // : Object.fromEntries(url.searchParams.entries()),
    ...(await loadUserData(searchParams?.userName ?? 'hi176', year, fetch))
  };
}
