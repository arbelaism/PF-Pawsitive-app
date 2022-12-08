import React from 'react'
import { NextPage } from 'next'
import DoughnutGraphic from './graphics/DoughnutGraphic'
import { getTransactions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction, Quantity } from '../../app/types'

interface Ele {
  quantity: number,
  name: string
}
interface Data {
  title: string,
  bridge: string,
  labels: string[],
  dat: number[],
}

const ProductMoreSold: NextPage = () => {

  const {
    data: transactions,
    error,
    isLoading,
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const diaActual = fecha.getDate() > 9 ? fecha.getDate() : `0${fecha.getDate()}`;
  const mesActual = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : `0${fecha.getMonth() + 1}`;
  // const mesActual = fecha.getMonth() + 1;
  const añoActual = fecha.getFullYear()

  const info: any = [];



  if (isSuccess) {
    const dayTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${mesActual}-${diaActual}`))
    dayTransaction.map((t: Transaction) => {
      t.quantity.map(({ quantity, product }: Quantity) => {
        info.push({ quantity, name: product.name })
      })
    })
  }





  function Props() {
    const infoSinRepetidos: Ele[] = info.reduce((acumulador: any, valorActual: any) => {
      const elementoYaExiste = acumulador.find((elemento: Ele) => elemento.name === valorActual.name);
      if (elementoYaExiste) {
        return acumulador.map((elemento: any) => {
          if (elemento.name === valorActual.name) {
            return {
              ...elemento,
              quantity: elemento.quantity + valorActual.quantity
            }
          }

          return elemento;
        });
      }

      return [...acumulador, valorActual];
    }, []);

    let sortedProducts: Ele[] = infoSinRepetidos.sort(
      (p1, p2) => (p1.quantity < p2.quantity) ? 1 : (p1.quantity > p2.quantity) ? -1 : 0);

    if (sortedProducts.length > 0) {
      const label = [
        sortedProducts[0].name,
        sortedProducts[1].name,
        sortedProducts[2].name,
        sortedProducts[3].name,
        sortedProducts[4].name
      ]
      const datos = [
        sortedProducts[0].quantity,
        sortedProducts[1].quantity,
        sortedProducts[2].quantity,
        sortedProducts[3].quantity,
        sortedProducts[4].quantity
      ]

      const props: Data = {
        title: "Los 5 productos mas vendidos del dia",
        bridge: "vendidos este dia",
        labels: label,
        dat: datos,
      }

      return props
    } else {
      const props: Data = {
        title: "Los 5 productos mas vendidos del dia",
        bridge: "vendidos este dia",
        labels: ["no se vendio"],
        dat: [0],
      }
      return props
    }
  }
  const data: Data = Props()

  return (
    <div>
      <DoughnutGraphic key={2} {...data} />
      <div><h3>El producto mas vendidos es: {data.labels[0]}</h3></div>
    </div>
  )
}

export default ProductMoreSold