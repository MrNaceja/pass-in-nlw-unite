import { ReactNode, useState } from "react"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { Row } from "./layout/row"

enum TableConfig {
    LIMIT = 10
}

type TColDef<TAvailableColumn> = {
    id: TAvailableColumn
    title: string
}

interface ITableProps<TData, TCol> {
    columns: TColDef<TCol>[],
    data: TData[]
    renderContentColumnRow: (column: TColDef<TCol>, row: TData) => ReactNode
}
export const Table = <T extends { id: string }, C extends Extract<keyof T, string>>({ columns, data, renderContentColumnRow }: ITableProps<T, C>) => {
    const [ page, setPage ] = useState(1)
    
    const totalPages = Math.ceil(( data.length / TableConfig.LIMIT ))

    const handleClickNextPage     = () => setPage(page + 1)
    const handleClickFinalPage    = () => setPage(totalPages)
    const handleClickPreviousPage = () => setPage(page - 1)
    const handleClickFirstPage    = () => setPage(1)

    return (
        <div className="border border-white/10 rounded-lg">
            <table className="w-full">
                <thead className="text-sm font-semibold text-left">
                    <tr>
                        <th className="py-3 px-4 w-10">
                            <input type="checkbox" className="rounded-sm bg-zinc-950 border-white/10 outline-none ring-0 focus:ring-0 focus:shadow-none cursor-pointer" />
                        </th>
                        {columns.map(col => (
                            <th key={col.id} className="py-3 px-4">{col.title}</th>
                        ))}
                        <th className="py-3 px-4 w-10"></th>
                    </tr>
                </thead>
                <tbody className="text-zinc-300 text-sm border-y border-white/10">
                    {
                        data.slice(((page - 1) * TableConfig.LIMIT), page * TableConfig.LIMIT).map(row => {
                            return (
                                <tr key={row.id} className="hover:bg-zinc-900 cursor-pointer">
                                    <td className="py-3 px-4"><input type="checkbox" className="rounded-sm bg-zinc-950 border-white/10 outline-none ring-0 focus:ring-0 focus:shadow-none cursor-pointer" /></td>
                                    {
                                        columns.map(col => {
                                            return (
                                                <td className="py-3 px-4" key={`${col.id}_${row.id}`}>
                                                    {renderContentColumnRow(col, row)}
                                                </td>
                                            )
                                        })
                                    }
                                    <td className="py-3 px-4">
                                        <Button icon={MoreHorizontal} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className="py-3 px-4">Mostrando { TableConfig.LIMIT } resultados de { data.length }</td>
                        <td colSpan={3} className="py-3 px-4 text-right">
                            <Row className="gap-1 inline-flex">
                                <span className="mr-5">Página { page } de { totalPages }</span>
                                <Button icon={ChevronsLeft}  onClick={handleClickFirstPage} disabled={page === 1}/>
                                <Button icon={ChevronLeft}   onClick={handleClickPreviousPage} disabled={page === 1}/>
                                <Button icon={ChevronRight}  onClick={handleClickNextPage} disabled={page === totalPages}/>
                                <Button icon={ChevronsRight} onClick={handleClickFinalPage} disabled={page === totalPages}/>
                            </Row>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}