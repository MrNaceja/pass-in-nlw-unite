import { ReactNode } from "react"
import { Button } from "./button"
import { MoreHorizontal } from "lucide-react"

type TColDef<TAvailableColumn> = {
    id: TAvailableColumn
    title: string
}

interface ITableProps<TData, TCol> {
    columns: TColDef<TCol>[]
    data: TData[]
    renderContentColumnRow: (column: TColDef<TCol>, row: TData) => ReactNode
    renderFooter: () => JSX.Element
}
export const Table = <T extends { id: string }, C extends Extract<keyof T, string>>
({ columns, data, renderContentColumnRow, renderFooter }: ITableProps<T, C>) => {
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
                        data.map(row => {
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
                    { renderFooter() }
                </tfoot>
            </table>
        </div>
    )
}