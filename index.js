const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://192.168.10.100:9200', log: 'trace' });

let seedData = [
  {
    "id": 1,
    "name": "Pavel",
    "gender": "male",
    "birthday": "1985-07-15",
    "position": "CTO",
    "relocation": true,
    "salary": {
      "total": 333,
      "currency": "BTC"
    },
    "skills": [ "nodejs", "graphql", "babel", "webpack", "oss contributor", "devOps" ],
    "languages": [ "ru", "en" ],
    "location": {
      "name": "Almaty",
      "point": [43.238949, 76.889709]
    },
    "createdAt": "2017-10-19T04:29:08Z"
  },
  {
    "id": 2,
    "name": "Helen",
    "gender": "female",
    "birthday": "1986-03-06",
    "position": "sales manager",
    "relocation": true,
    "salary": {
      "total": 12345,
      "currency": "USD"
    },
    "skills": [ "Communication", "Ability to Attain Targets", "Analytical Ability", "Judgment"],
    "languages": [ "ru", "en" ],
    "location": {
      "name": "Almaty",
      "point": [43.238949, 76.889709]
    },
    "createdAt": "2017-10-19T04:29:09Z"
  },
  {
    "id": 3,
    "name": "Andrew",
    "gender": "male",
    "birthday": "1952-02-19",
    "position": "Vice President Sales",
    "relocation": false,
    "salary": {
      "total": 23456,
      "currency": "USD"
    },
    "skills": [ "BTS commercial", "international marketing"],
    "languages": [ "en", "fr", "ge" ],
    "location": {
      "name": "Tacoma"
    },
    "createdAt": "2017-10-19T04:29:10Z"
  },
  {
    "id": 4,
    "name": "Steven",
    "gender": "male",
    "birthday": "1955-03-04",
    "position": "Sales Representative",
    "relocation": false,
    "salary": {
      "total": 12222,
      "currency": "USD"
    },
    "skills": [ "BA in psychology", "Art of the Cold Call"],
    "languages": [ "en" ],
    "location": {
      "name": "Seattle"
    },
    "createdAt": "2017-10-19T04:29:11Z"
  }
]

const body = [];
seedData.forEach(row => {
  const { id, ...restData } = row;
  body.push({ index: { _index: 'demo_user', _type: 'demo_user', _id: id } }, restData);
});

async function checkElasticSearch() {
  // client
  //   .bulk({
  //     index: 'demo_user',
  //     type: 'demo_user',
  //     body,
  //   })
  //   .then(() => {
  //     console.log('Data successfully seeded!');
  //   });
  const { body } = await client.search({
    index: 'demo_user',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        "bool": {
          "must": [
            {
              "terms": {
                "name.keyword": [
                  "Steven",
                  "Andrew"
                ]
              }
            }
          ]
        }
      }
      , "_source": {
        "includes": [
          "name",
          "gender",
          "birthday"
        ]
      }
    }
  })
  console.log(body.hits.hits)
}

checkElasticSearch();