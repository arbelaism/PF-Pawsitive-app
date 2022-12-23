import React from 'react'
import { NextPage } from 'next'
import LineGraphic from '../graphics/LineGraphic'
import { getTransactions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction, Quantity } from '../../../app/types'

interface Data {
  title: string,
  bridge: string,
  labelRow: string[],
  labels1title: string,
  labels2title: string,
  labels1: string[],
  labels2: string[],
  dat1: number[],
  dat2: number[],
}
type Dat1Dat2 = [number[], number[]]

const BalancePerMont: NextPage = () => {

  const {
    data: transactions,
    
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const añoActual = fecha.getFullYear()
  function getAmountByMont() {
    const data1AndData2: Dat1Dat2 = [[], []]

    for (let i = 1; i <= 12; i++) {
      let j = i > 9 ? i : `0${i}`
      const info: number[] = [];
      const info2: number[] = [];
      if (isSuccess) {
        const montTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${j}`))
        const result2 = montTransaction.map((t: Transaction) => {
          info2.push(t.amount)
        })
        const result = montTransaction.map((t: Transaction) => {
          t.quantity.map(({ quantity, product }: Quantity) => {
            if (!product) return
            info.push((product.price * quantity))

          })
        })

        if (info.length > 0) {
          //lo que se vendio
          const resCost = info2.reduce((acc: number, current: number) => acc + current)
          //lo que costo
          const resSell = info.reduce((acc: number, current: number) => acc + current)

          data1AndData2[0].push(resSell)
          data1AndData2[1].push(resCost)
        } else {
          data1AndData2[0].push(0)
          data1AndData2[1].push(0)
        }
      }

    }
    return data1AndData2
  }
  function createData() {
    const result = getAmountByMont()

    const data = {
      title: 'Balance por Mes',
      labelRow: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      labels1title: 'Costo Por Mes',
      labels2title: 'Venta Por Mes',
      dat1: result[0],
      dat2: result[1],
    }
    return data
  }

  const data = createData()


  return (
    <div >
      <LineGraphic key={1} {...data} />
    </div>
  )
}

export default BalancePerMont
