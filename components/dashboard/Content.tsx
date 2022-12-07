import React from 'react'
import { NextPage } from 'next'
import DoughnutGraphic from './graphics/DoughnutGraphic'
import { getTransactions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
// interface Props {
//   title: string,
//   bridge: string,
//   labels: string[],
//   dat: number[],
//   colors: string[]
// }


const Content: NextPage = () => {

  const {
    data: transactions,
    error,
    isLoading,
    isSuccess
  } = useQuery(['adoptions'], getTransactions)

const colors=[
  '#a2dcbb',
  '#7dcf9f',
  '#58c184',
  '#3ea76a',
  '#308253',
  '#235d3b',
  '#153823',
]
  const props = {
    title: "Categorias",
    bridge: "vendidos mensualmente, total:",
    labels: [
      "TOY",
      "FOOD",
      "SNACK",
      "ACCESORIES",
      "HYGIENE",
      "HEALTH",
      "OTHER"],
    dat: [
      10,
      20,
      12,
      4,
      15,
      15,
      35
    ],
    colors: [
      '#a2dcbb',
      '#7dcf9f',
      '#58c184',
      '#3ea76a',
      '#308253',
      '#235d3b',
      '#153823',
    ]
  }


  return (
    <div>
      <DoughnutGraphic {...props} />
    </div>
  )
}

export default Content