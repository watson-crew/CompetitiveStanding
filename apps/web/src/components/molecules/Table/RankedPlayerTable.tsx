import { Column, HeaderGroup, Row, useSortBy, useTable } from 'react-table';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

type Props = {
  columns: Array<Column<object>>;
  data: Array<object>;
};

export default function RankedPlayerTable({ columns, data }: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    );

  return (
    <table
      {...getTableProps()}
      className="w-full rounded-lg text-left text-sm text-gray-500"
    >
      <thead className="bg-gray-100 text-xs uppercase text-gray-700">
        {headerGroups.map((headerGroup, index) => (
          <HeaderRow headerGroup={headerGroup} key={index} />
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return <BodyRow row={row} key={row.id} />;
        })}
      </tbody>
    </table>
  );
}

function BodyRow({ row }: { row: Row<object> }) {
  return (
    <tr {...row.getRowProps()} className="border-b bg-white">
      {row.cells.map(cell => {
        return (
          <td {...cell.getCellProps()} className="py-4 px-6">
            {cell.render('Cell')}
          </td>
        );
      })}
    </tr>
  );
}

function HeaderRow({ headerGroup }: { headerGroup: HeaderGroup<object> }) {
  return (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          scope="col"
          className=" items-center py-3 px-6"
        >
          <span className="flex">
            {column.render('Header')}
            {column.isSorted ? (
              column.isSortedDesc ? (
                <HiOutlineChevronDown />
              ) : (
                <HiOutlineChevronUp />
              )
            ) : (
              ''
            )}
          </span>
        </th>
      ))}
    </tr>
  );
}
