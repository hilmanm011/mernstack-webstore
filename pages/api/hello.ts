// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  age: number,
  statusActive: boolean
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let dataAnggota = [
    { name: 'John Doe',
      age: 18,
      statusActive: true
    },
    { name: 'Nike',
      age: 19,
      statusActive: false
    },
    { name: 'Pita',
      age: 20,
      statusActive: true
    }
  ]
  // let status = req.query.status
  // let dataResponse = dataAnggota.filter((item)=>{
  //   return item.statusActive
  // })
  res.status(200).json(dataAnggota)
}
