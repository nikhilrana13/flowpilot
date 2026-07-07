"use client";

const TableRenderer = ({ data }) => {
    if (!data.length) return null;

    const columns = Object.keys(data[0]);

    return (
        <div className="overflow-auto rounded-xl border border-[#2A2A33]">
            <table className="w-full text-sm">
                <thead className="bg-[#111114]">
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col}
                                className="border-b border-[#27272A] px-4 py-3 text-left text-white"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, i) => (
                        <tr
                            key={i}
                            className="border-b border-[#27272A]"
                        >
                            {columns.map(col => (
                                <td
                                    key={col}
                                    className="px-4 py-3 text-[#D4D4D8]"
                                >
                                    {String(row[col])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableRenderer;