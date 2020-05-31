import React, { useState } from 'react'
import { useQuery } from 'react-query'

import './App.css'

const GRAPHQL_API_URL = process.env.REACT_APP_GRAPHQL_API_URL

const query = `query {
  heads_m: allMonsterParts (where: { type: head_m }) {
    name,
    image {
      publicUrl
    }
  },
  bodies_m: allMonsterParts (where: { type: body_m }) {
    name,
    image {
      publicUrl
    }
  },
  legs_m: allMonsterParts (where: { type: legs_m }) {
    name,
    image {
      publicUrl
    }
  },
}`

const fetchParts = () => {
  return window.fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      operationName: null,
      query,
      variables: {}
    })
  })
  .then(response => response.json())
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export const App = () => {
  const [indexes, setIndexes] = useState(null)

  const { status, data, error } = useQuery('parts', fetchParts)

  switch (status) {
    case 'success': {
      const { data: { heads_m, bodies_m, legs_m } } = data

      if (indexes !== null) {

        const shuffle = () => {
          const remainingHeads = heads_m
            .map((h, index) => index)
            .filter(headIndex => headIndex !== indexes[0])

          const remainingBodies = bodies_m
            .map((b, index) => index)
            .filter(bodyIndex => bodyIndex !== indexes[1])

          const remainingLegs = legs_m
            .map((l, index) => index)
            .filter(legsIndex => legsIndex !== indexes[2])

          console.log({
            remainingHeads,
            remainingBodies
          })

          setIndexes([
            remainingHeads[getRandomIntInclusive(0, remainingHeads.length - 1)],
            remainingBodies[getRandomIntInclusive(0, remainingBodies.length - 1)],
            remainingLegs[getRandomIntInclusive(0, remainingLegs.length - 1)]
          ])
        }

        const head = heads_m[indexes[0]]
        const body = bodies_m[indexes[1]]
        const legs = legs_m[indexes[2]]

        return <div className='App'>
          <div
            className='Monster'
            onClick={shuffle}>
            {head && <div>
              <img src={head.image.publicUrl} />
            </div>}
            {body && <div>
              <img src={body.image.publicUrl} />
            </div>}
            {legs && <div>
              <img src={legs.image.publicUrl} />
            </div>}
          </div>

          <button onClick={shuffle}>Embaralhar!</button>
        </div>
      } else {
        setIndexes([
          getRandomIntInclusive(0, heads_m.length - 1),
          getRandomIntInclusive(0, bodies_m.length - 1),
          getRandomIntInclusive(0, legs_m.length - 1)
        ])
      }
    }
    default: {
      return <div className='App'>
        <header className='App-header'>
          Carregando
        </header>
      </div>
    }
  }
}
