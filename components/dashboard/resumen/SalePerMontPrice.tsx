import React from 'react'
import { NextPage } from 'next'
import DoughnutGraphic from '../graphics/DoughnutGraphic'
import { getTransactions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction, Quantity } from '../../../app/types'




const SalePerMontPrice: NextPage = () => {

  const {
    data: transactions,
    error,
    isLoading,
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const mesActual = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : `0${fecha.getMonth() + 1}`;
  const añoActual = fecha.getFullYear()

  const info = [0, 0, 0, 0, 0, 0, 0,]

  if (isSuccess) {
    const montTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${mesActual}`))

    montTransaction.map((t: Transaction) => {
      t.quantity.map((q: Quantity) => {
        if (q.product.category === "TOY") { info[0] += (q.quantity * q.product.displayPrice) }
        else if (q.product.category === "FOOD") { info[1] += (q.quantity * q.product.displayPrice) }
        else if (q.product.category === "SNACK") { info[2] += (q.quantity * q.product.displayPrice) }
        else if (q.product.category === "ACCESORIES") { info[3] += (q.quantity * q.product.displayPrice) }
        else if (q.product.category === "HYGIENE") { info[4] += (q.quantity * q.product.displayPrice) }
        else if (q.product.category === "HEALTH") { info[5] += (q.quantity * q.product.displayPrice) }
        else if (q.product.category === "OTHER") { info[6] += (q.quantity * q.product.displayPrice) }
      })
    })
  }

  const props = {
    title: "Total Vendido en Dinero Por Categoria",
    bridge: "vendidos este mes",
    labels: [
      "TOY",
      "FOOD",
      "SNACK",
      "ACCESORIES",
      "HYGIENE",
      "HEALTH",
      "OTHER"],
    dat: info,
  }


  return (
    <div>
      <DoughnutGraphic key={3} {...props} />
    </div>
  )
}

export default SalePerMontPrice