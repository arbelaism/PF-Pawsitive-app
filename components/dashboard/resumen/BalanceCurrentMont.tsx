import React from 'react'
import { NextPage } from 'next'
import { getTransactions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction, Quantity } from '../../../app/types'
import BarGraphicVertical from '../graphics/BarGraphicVertical'

const BalanceCurrentMont: NextPage = () => {

  const {
    data: transactions,
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const mesActual = (fecha.getMonth() + 1 > 9 ? (fecha.getMonth() + 1) : `0${fecha.getMonth() + 1}`)

  const añoActual = fecha.getFullYear()
  function getAmountByMont() {

    const info: number[] = [];
    const info2: number[] = [];
    if (isSuccess) {
      const montTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${mesActual}`))

      montTransaction.map((t: Transaction) => {
        info2.push(Number(t.amount))
      })
      montTransaction.map((t: Transaction) => {
        t.quantity.map(({ quantity, product }: Quantity) => {
            if (!product) return
          info.push((product.price * quantity))
        })
      })
      const salesResult = info2.length ? info2.reduce((acc: number, current: number) => acc + current) : 0
      const expensesResult =info.length ? info.reduce((acc: number, current: number) => acc + current) : 0
      return [salesResult, expensesResult]
    }
  }

  const datos = getAmountByMont() || [0, 0]

  const data = {
    title: "Balance de este mes",
    labelstitle: ["Ventas", "Gastos", "Ganancias"],
    datos: [...datos, (datos[0] - datos[1])]

  }




  return (
    <div>

      <BarGraphicVertical key={7} {...data} />

    </div>
  )
}

export default BalanceCurrentMont
