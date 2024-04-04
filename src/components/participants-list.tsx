import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"
import { Row } from "./layout/row"
import { Column } from "./layout/column"
import { Table } from "./table"

import { fetchParticipants, TParticipant } from "../services/fetch-participants"

import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/pt-br'
import { Button } from "./button"

dayjs.locale('pt-br')
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('pt-br', {
    relativeTime: {
        future: "Há %s",
        past: "%s atrás",
        s: 'agora a pouco',
        m: "Há um minuto",
        mm: "%d minutos",
        h: "Há uma hora",
        hh: "%d horas",
        d: "Há um dia",
        dd: "%d dias",
        M: "Há um mês",
        MM: "%d meses",
        y: "Há um ano",
        yy: "%d anos"
    }
})

const LIMIT_PARTICIPANTS_PER_PAGE = 10

export const ParticipantsList = () => {
    const [participants, setParticipants] = useState<TParticipant[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(() => (
        Number((new URLSearchParams(window.location.search)).get('page')) || 1
    ))
    const [search, setSearch] = useState(() => (
        (new URLSearchParams(window.location.search)).get('search') || ''
    ))

    const changePage = (newPage : number) => {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(newPage))
        window.history.pushState({}, '', url)
        setPage(newPage)
    }

    const changeSearch = (digitedSearch : string) => {
        const url = new URL(window.location.toString())
        url.searchParams.set('search', digitedSearch)
        if (digitedSearch.length == 0) {
            url.searchParams.delete('search')
        }
        window.history.pushState({}, '', url)
        changePage(1)
        setSearch(digitedSearch)
    }

    const handleClickNextPage     = () => changePage(page + 1)
    const handleClickFinalPage    = () => changePage(totalPages)
    const handleClickPreviousPage = () => changePage(page - 1)
    const handleClickFirstPage    = () => changePage(1)

    useEffect(() => {
        (async () => {
            const data = await fetchParticipants({ page, search, delay: 0 })
            setParticipants(data.participants)
            setTotalPages(Math.ceil(data.total / LIMIT_PARTICIPANTS_PER_PAGE))
        })()
    }, [page, search, setTotalPages, setParticipants])
    return (
        <main>
            <Column className="gap-5">
                <header>
                    <Row className="gap-3">
                        <h1 className="font-bold text-2xl">Participantes</h1>
                        <Row className="w-72 border border-white/10 px-3 py-1.5 rounded-md text-sm items-center gap-2">
                            <Search className="size-4 text-emerald-300" />
                            <input
                                type="text"
                                placeholder="Buscar participante..."
                                className="h-auto p-0 flex-1 bg-transparent outline-none border-none focus:ring-0"
                                value={search}
                                onChange={e => changeSearch(e.target.value)}
                            />
                        </Row>
                    </Row>
                </header>
                <Table
                    data={participants}
                    columns={[
                        {
                            id: 'id',
                            title: 'Código'
                        },
                        {
                            id: 'name',
                            title: 'Participante'
                        },
                        {
                            id: 'subscribedAt',
                            title: 'Data da inscrição'
                        },
                        {
                            id: 'checkInAt',
                            title: 'Data do check-in'
                        }
                    ]}
                    renderContentColumnRow={(col, row) => {
                        if (col.id == 'name') {
                            return (
                                <Column className="gap-1">
                                    <span className="font-semibold text-white">{row.name}</span>
                                    <span>{row.email}</span>
                                </Column>
                            )
                        }
                        if (col.id == 'checkInAt' || col.id == 'subscribedAt') {
                            const dateAt = row[col.id]
                            return (
                                <span>
                                    {
                                        col.id == 'checkInAt'
                                        ? !row.checkInAt ? <span className="py-1 px-2 rounded-md bg-rose-700/10 text-rose-700">Check-in pendente</span> : dayjs().from(dateAt)
                                        : dayjs().from(dateAt)
                                    }
                                </span>
                            )
                        }
                        return <span>{row[col.id]}</span>
                    }}
                    renderFooter={() => (
                        <tr>
                            <td colSpan={3} className="py-3 px-4">Mostrando {participants.length} resultados de {LIMIT_PARTICIPANTS_PER_PAGE}</td>
                            <td colSpan={3} className="py-3 px-4 text-right">
                                <Row className="gap-1 inline-flex">
                                    <span className="mr-5">Página {page} de {totalPages}</span>
                                    <Button icon={ChevronsLeft} onClick={handleClickFirstPage} disabled={page === 1} />
                                    <Button icon={ChevronLeft} onClick={handleClickPreviousPage} disabled={page === 1} />
                                    <Button icon={ChevronRight} onClick={handleClickNextPage} disabled={page === totalPages} />
                                    <Button icon={ChevronsRight} onClick={handleClickFinalPage} disabled={page === totalPages} />
                                </Row>
                            </td>
                        </tr>
                    )}
                />
            </Column>
        </main>
    )
}