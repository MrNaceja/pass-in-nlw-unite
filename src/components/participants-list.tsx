import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { Row } from "./layout/row"
import { Column } from "./layout/column"
import { Button } from "./button"

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
                <div className="border border-white/10 rounded-lg">
                    <table className="w-full">
                        <thead className="text-sm font-semibold text-left">
                            <tr>
                                <th className="py-3 px-4 w-10">
                                    <input type="checkbox" className="rounded-sm bg-zinc-950 border-white/10 outline-none ring-0 focus:ring-0 focus:shadow-none cursor-pointer"/>
                                </th>
                                <th className="py-3 px-4">Código</th>
                                <th className="py-3 px-4">Participante</th>
                                <th className="py-3 px-4">Data da inscrição</th>
                                <th className="py-3 px-4">Data do check-in</th>
                                <th className="py-3 px-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-300 text-sm border-y border-white/10">
                            {
                                Array.from({ length: 10 }).map((_,i) => (
                                    <tr key={i}>
                                        <td className="py-3 px-4"><input type="checkbox" className="rounded-sm bg-zinc-950 border-white/10 outline-none ring-0 focus:ring-0 focus:shadow-none cursor-pointer"/></td>
                                        <td className="py-3 px-4">1234</td>
                                        <td className="py-3 px-4">
                                            <Column className="gap-1">
                                                <span className="font-semibold text-white">Eduardo Toriani</span>
                                                <span>edutoriani13@gmail.com</span>
                                            </Column>
                                        </td>
                                        <td className="py-3 px-4">5 dias atrás</td>
                                        <td className="py-3 px-4">2 dias atrás</td>
                                        <td className="py-3 px-4">
                                            <Button icon={MoreHorizontal} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="py-3 px-4">Mostrando todos os resultados</td>
                                <td colSpan={3} className="py-3 px-4 text-right">
                                    <Row className="gap-1 inline-flex">
                                        <span className="mr-5">1 Resultado de 10.</span>
                                        <Button icon={ChevronsLeft}/>
                                        <Button icon={ChevronLeft}/>
                                        <Button icon={ChevronRight}/>
                                        <Button icon={ChevronsRight}/>
                                    </Row>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Column>
        </main>
    )
}