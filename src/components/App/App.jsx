import React, { useState } from 'react'
import { useQuery } from 'react-query'

import './App.css'

const LOCAL_DATA = {"data":{"heads_m":[{"name":"Cabeça Astronauta","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1ac96a5ed8a4caa7a5803-astronauta-cabeca.jpg"}},{"name":"Pintinho Cabeça","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1accda5ed8a4caa7a5809-pintinho-cabeca.jpg"}},{"name":"Dançarina Cabeça","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1acf3a5ed8a4caa7a580f-dancarina-cabeca.jpg"}}],"bodies_m":[{"name":"Astronauta Tronco","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1acafa5ed8a4caa7a5805-astronauta-tronco.jpg"}},{"name":"Pintinho Tronco","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1acdaa5ed8a4caa7a580b-pintinho-tronco.jpg"}},{"name":"Dançarina Tronco","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1ad02a5ed8a4caa7a5811-dancarina-tronco.jpg"}}],"legs_m":[{"name":"Astronauta Pernas","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1acbca5ed8a4caa7a5807-astronauta-pernas.jpg"}},{"name":"Pintinho Pernas","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1ace7a5ed8a4caa7a580d-pintinho-pernas.jpg"}},{"name":"Dançarina Pernas","image":{"publicUrl":"https://monstros.s3-sa-east-1.amazonaws.com/uploads/5ed1ad0fa5ed8a4caa7a5813-dancarina-pernas.jpg"}}]},"extensions":{"tracing":{"version":1,"startTime":"2020-05-30T01:21:14.256Z","endTime":"2020-05-30T01:21:14.263Z","duration":6493229,"execution":{"resolvers":[{"path":["heads_m"],"parentType":"Query","fieldName":"allPartesdemonstros","returnType":"[MonsterPart]","startOffset":224331,"duration":3471000},{"path":["bodies_m"],"parentType":"Query","fieldName":"allPartesdemonstros","returnType":"[MonsterPart]","startOffset":534593,"duration":5017889},{"path":["legs_m"],"parentType":"Query","fieldName":"allPartesdemonstros","returnType":"[MonsterPart]","startOffset":900831,"duration":5343328},{"path":["heads_m",0,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":3742550,"duration":63267},{"path":["heads_m",0,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":3813554,"duration":44484},{"path":["heads_m",0,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":3870463,"duration":4462},{"path":["heads_m",1,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":3885705,"duration":24296},{"path":["heads_m",1,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":4024746,"duration":86199},{"path":["heads_m",1,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":4123473,"duration":3979},{"path":["heads_m",2,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":4135399,"duration":27902},{"path":["heads_m",2,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":4166916,"duration":31308},{"path":["heads_m",2,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":4203381,"duration":2696},{"path":["bodies_m",0,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":5594543,"duration":64774},{"path":["bodies_m",0,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":5698526,"duration":64365},{"path":["bodies_m",0,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":5778618,"duration":7589},{"path":["bodies_m",1,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":5796298,"duration":27303},{"path":["bodies_m",1,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":5827351,"duration":28473},{"path":["bodies_m",1,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":5863509,"duration":3235},{"path":["bodies_m",2,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":5873282,"duration":20604},{"path":["bodies_m",2,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":5896859,"duration":29991},{"path":["bodies_m",2,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":5932287,"duration":4538},{"path":["legs_m",0,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":6263872,"duration":31112},{"path":["legs_m",0,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":6299416,"duration":29995},{"path":["legs_m",0,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":6340380,"duration":3309},{"path":["legs_m",1,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":6350610,"duration":20619},{"path":["legs_m",1,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":6374192,"duration":26353},{"path":["legs_m",1,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":6405658,"duration":2842},{"path":["legs_m",2,"name"],"parentType":"MonsterPart","fieldName":"name","returnType":"String","startOffset":6416010,"duration":16967},{"path":["legs_m",2,"image"],"parentType":"MonsterPart","fieldName":"image","returnType":"File","startOffset":6437816,"duration":22707},{"path":["legs_m",2,"image","publicUrl"],"parentType":"File","fieldName":"publicUrl","returnType":"String","startOffset":6464894,"duration":4417}]}}}}

const query = `query {
  heads_m: allPartesdemonstros (where: { type: head_m}) {
    name,
    image {
      publicUrl
    }
  },
  bodies_m: allPartesdemonstros (where: { type: body_m}) {
    name,
    image {
      publicUrl
    }
  },
  legs_m: allPartesdemonstros (where: { type: legs_m}) {
    name,
    image {
      publicUrl
    }
  },
}`

const fetchParts = () => {
  return Promise.resolve(LOCAL_DATA)

  // return window.fetch('http://localhost:3000/admin/api', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify({
  //     operationName: null,
  //     query,
  //     variables: {}
  //   })
  // })
  // .then(response => response.json())
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

        return <div className='App'>
          <div
            className='Monster'
            onClick={shuffle}>
            <div>
              <img src={heads_m[indexes[0]].image.publicUrl} />
            </div>
            <div>
              <img src={bodies_m[indexes[1]].image.publicUrl} />
            </div>
            <div>
              <img src={legs_m[indexes[2]].image.publicUrl} />
            </div>
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
