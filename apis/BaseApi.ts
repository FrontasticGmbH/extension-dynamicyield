const request = require('request-promise-native');

const APIKEY = '973cbfa6b49b057f9fead41953899557beb49e14779504c0ee86316d66e8df2d';
const DYHOST = 'https://dy-api.eu';

async function choose(userId,  dyContext, selectors = []) {
  const options = {
    method: 'POST',
    uri: `${DYHOST}/v2/serve/user/choose`,
    headers: {
      'DY-API-Key': APIKEY,
    },
    body: {
      selector: {
        names: selectors, //HP Hero Banner
      },
      user: {
        id: userId, //8782972
      },

      context: dyContext,
    },
    json: true,
  };

  let variations = {};
  try {
    const response = await request(options);
    variations = response.choices;
    console.log(`Choose response: ${JSON.stringify(response, null, 2)}`);
  } catch (e) {
    console.error(`ERROR IN CHOOSE: ${e.message}`);
  }
  return variations;
}

module.exports = {
  choose
};
