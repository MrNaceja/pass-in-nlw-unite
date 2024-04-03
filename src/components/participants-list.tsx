import { Search } from "lucide-react"
import { Row } from "./layout/row"
import { Column } from "./layout/column"
import { Table } from "./table"

import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/pt-br'

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

import { participants } from "../data/fake-participants"

export const ParticipantsList = () => {
    return (
        <main>
            <Column className="gap-5">
                <header>
                    <Row className="gap-3">
                        <h1 className="font-bold text-2xl">Participantes</h1>
                        <Row className="w-72 border border-white/10 px-3 py-1.5 rounded-md text-sm items-center gap-2">
                            <Search className="size-4 text-emerald-300" />
                            <input type="text" placeholder="Buscar participante..." className="h-auto p-0 flex-1 bg-transparent outline-none border-none focus:ring-0" />
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
                                    { dayjs().from(dateAt)  }
                                </span>
                            )
                        }
                        return <span>{ row[col.id] }</span>
                    }}
                />
            </Column>
        </main>
    )
}