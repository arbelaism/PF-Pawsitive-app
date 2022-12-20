import { useUser } from '@auth0/nextjs-auth0/client'
import { MainLayout } from 'components'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    deleteBookmark,
    deleteSelectedBookmarks,
    getBookmarks
} from 'utils/dbFetching'
import Image from 'next/image'
import Loading from 'public/loading.gif'
import { Product } from 'app/types'
import Link from 'next/link'
import { FaHeartBroken } from 'react-icons/fa'

const Bookmarks = () => {
    const { user, error, isLoading } = useUser()
    const [myBookmarks, setMyBookmarks] = useState<Product[]>()
    const [checkboxState, setCheckboxState] = useState<String[]>([])

    const queryClient = useQueryClient()

    let userId: string = ''
    if (!isLoading && user && user.sub) {
        userId = user.sub
    }

    const {
        data: bookmarks,
        isLoading: isBookmarksLoading,
        isSuccess: isBookmarksSuccess,
        refetch
    } = useQuery(['bookmarks', userId], () => getBookmarks(userId))

    const mutationDelete = useMutation(
        ({ id, productId }: any) => deleteBookmark(id, productId),
        {
            onSuccess: () => {
                queryClient.refetchQueries()
            }
        }
    )

    const mutationMultipleDelete = useMutation(
        ({ id, productId }: any) => deleteSelectedBookmarks(id, productId),
        {
            onSuccess: () => {
                queryClient.refetchQueries()
            }
        }
    )

    const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkbox = document.getElementsByName(
            'bookmarkCheckbox'
        ) as NodeListOf<HTMLInputElement>

        const selectAllCheckbox = document.getElementById(
            'selectAll'
        ) as HTMLInputElement

        if (!checkbox) return

        let productIds: String[] = []

        checkbox.forEach(check => {
            if (selectAllCheckbox.checked) {
                check.checked = true
                productIds.push(check.id)
                return
            } else {
                check.checked = false
                setCheckboxState([])
                return
            }
        })

        setCheckboxState(productIds)
        return
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const productId = e.target.id as string

        if (e.target.checked) {
            setCheckboxState([...checkboxState, productId])
            return
        }

        if (e.target.checked === false) {
            setCheckboxState(checkboxState.filter(ch => ch !== productId))
            return
        }
    }

    const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
        const productId = e.currentTarget.name

        mutationDelete.mutate({ id: userId, productId })
    }

    const handleSelectedBookmarks = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (checkboxState.length > 0) {
            mutationMultipleDelete.mutate({
                id: userId,
                productId: checkboxState
            })
        }
    }

    useEffect(() => {
        if (!isBookmarksLoading && isBookmarksSuccess) {
            setMyBookmarks(bookmarks.product)
        }

        refetch()
    }, [userId, bookmarks])

    return (
        <MainLayout title="Tus favoritos - Pawsitive">
            <div className="min-w-[50%] w-max min-h-[75vh] m-auto py-4 flex flex-col justify-center">
                {myBookmarks && myBookmarks.length > 1 ? (
                    <h1 className="title text-4xl py-6 justify-self-start">
                        Favoritos
                    </h1>
                ) : null}
                {isBookmarksLoading ? (
                    <div className="flex justify-center items-center my-16">
                        <Image
                            src={Loading}
                            alt="not found"
                            width={100}
                            height={100}
                        />
                    </div>
                ) : null}
                {myBookmarks && myBookmarks.length < 1 ? (
                    <div className="flex flex-col items-center justify-center text-3xl gap-3 text-pwpurple-600">
                        <FaHeartBroken className="text-7xl" />
                        <span>Actualmente no tenes favoritos</span>
                    </div>
                ) : (
                    <div className="w-full bg-white border rounded-lg shadow-md">
                        <div className="flex justify-between items-center px-6 py-4">
                            <div className="flex gap-4 items-center">
                                <input
                                    type="checkbox"
                                    id="selectAll"
                                    className="checkbox"
                                    onChange={selectAll}
                                />
                                <button
                                    className="text-sm text-pwgreen-800 hover:bg-pwgreen-100 py-2 px-2 rounded-md disabled:bg-transparent disabled:text-slate-500 transition-all"
                                    id="deleteAllBookmarks"
                                    onClick={handleSelectedBookmarks}
                                    disabled={
                                        checkboxState.length ? false : true
                                    }>
                                    Eliminá tus favoritos seleccionados
                                </button>
                            </div>
                            <span className="text-sm text-slate-500">
                                Actualmente tenés:{' '}
                                {myBookmarks && myBookmarks.length} favoritos
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            {myBookmarks &&
                                myBookmarks.map((p: Product) => (
                                    <div
                                        key={p.id}
                                        className="bg-white flex items-center border-t border-slate-200 min-w-[800px] w-full px-4 py-8 gap-2">
                                        <div className="mx-2">
                                            <input
                                                type="checkbox"
                                                name="bookmarkCheckbox"
                                                id={p.id}
                                                onChange={handleCheckbox}
                                                className="checkbox"
                                            />
                                        </div>
                                        <div className="w-1/4 flex items-center justify-center">
                                            <Image
                                                src={p.photo}
                                                alt="not found"
                                                width={128}
                                                height={128}
                                                className="rounded-full"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="w-3/4 flex flex-col items-start gap-4">
                                            <h4 className="font-Rubik font-medium text-xl text-pwgreen-900">
                                                {p.name}
                                            </h4>
                                            <span className="font-Rubik text-pwpurple-700 font-normal text-3xl">
                                                ${p.displayPrice}
                                            </span>

                                            <button
                                                name={p.id}
                                                onClick={handleBookmark}
                                                className="text-pwgreen-600 hover:text-pwpurple-800 transition-colors">
                                                Eliminar
                                            </button>
                                            <div className="self-end mx-2 text-sm text-pwgreen-600 hover:text-pwgreen-800 transition-colors">
                                                <Link href={`/product/${p.id}`}>
                                                    <a>Ir a los detalles</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default Bookmarks
