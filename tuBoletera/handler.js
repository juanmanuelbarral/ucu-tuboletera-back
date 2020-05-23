'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'TuBoleteraTable';
const TEST_PAGE_VISIT = 'TestPageVisit';
const TEST_KNOW_MORE = 'TestKnowMore';
const PAGE_VISIT = 'PageVisit';
const KNOW_MORE = 'KnowMore';

const addToItem = (item, name) => {
  if (item) {
    if (item.value) {
      return {
        name: item.name,
        value: item.value + 1
      }
    } else {
      return {
        name: item.name,
        value: 1
      }
    }
  } else {
    return {
      name: name,
      value: 1
    }
  }
}

exports.testPageVisit = async (event) => {
  console.log('test page visit');

  const name = TEST_PAGE_VISIT;
  const item = await getItem(name);
  const newItem = addToItem(item, name);
  const savedItem = await saveItem(newItem);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(savedItem),
  }
}

exports.testKnowMore = async (event) => {
  console.log('test know more');

  const name = TEST_KNOW_MORE;
  const item = await getItem(name);
  const newItem = addToItem(item, name);
  const savedItem = await saveItem(newItem);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(savedItem),
  }
}

exports.pageVisit = async (event) => {
  console.log('page visit');

  const name = PAGE_VISIT;
  const item = await getItem(name);
  const newItem = addToItem(item, name);
  const savedItem = await saveItem(newItem);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(savedItem),
  }
}

exports.knowMore = async (event) => {
  console.log('know more');

  const name = KNOW_MORE;
  const item = await getItem(name);
  const newItem = addToItem(item, name);
  const savedItem = await saveItem(newItem);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(savedItem),
  }
}

exports.getTestData = async (event) => {
  console.log('get test data');

  try {
    const tpvItem = await getItem(TEST_PAGE_VISIT);
    const tkmItem = await getItem(TEST_KNOW_MORE);

    if (tpvItem.value && tkmItem.value) {

      const bodyItem = {
        testPageVisit: tpvItem.value,
        testKnowMore: tkmItem.value
      }

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bodyItem),
      }
    }
  } catch (e) {
    console.log(e);
    const bodyItem = {
      testPageVisit: -1,
      testKnowMore: -1
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(bodyItem),
    }
  }
}

exports.getData = async (event) => {
  console.log('get data');

  try {
    const pvItem = await getItem(PAGE_VISIT);
    const kmItem = await getItem(KNOW_MORE);

    if (pvItem.value && kmItem.value) {

      const bodyItem = {
        pageVisit: pvItem.value,
        knowMore: kmItem.value
      }

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bodyItem),
      }
    }
  } catch (e) {
    console.log(e);
    const bodyItem = {
      pageVisit: -1,
      knowMore: -1
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(bodyItem),
    }
  }
}

async function getItem(name) {
  console.log('getItem');

  const params = {
    Key: {
      name: name,
    },
    TableName: TABLE_NAME
  };

  console.log(params);

  return dynamo.get(params).promise().then(result => {
    console.log(result);
    return result.Item;
  });
};


async function saveItem(item) {
  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  console.log(params)

  return dynamo.put(params).promise().then(() => {
    return item;
  });
};
