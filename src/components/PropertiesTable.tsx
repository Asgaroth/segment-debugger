function PropertyRow({ name, value, even }: any) {
  return (
    <tr className={even ? 'bg-white' : 'bg-gray-50'}>
      <td className="px-4 py-2 font-medium text-gray-500">{name}</td>
      <td className="px-4 py-2 text-gray-600 text-sm">
        {typeof value === 'object' ? (
          <pre>{JSON.stringify(value, null, 1)}</pre>
        ) : (
          value
        )}
      </td>
    </tr>
  );
}

function SubTable({ even, name, data }: any) {
  return (
    <tr className={even ? 'bg-white' : 'bg-gray-50'}>
      <td className="px-4 py-2 font-medium text-gray-500">{name}</td>
      <td className="px-4 py-2 text-gray-600 text-sm">
        <table className="divide-y divide-gray-200 border rounded">
          <tbody>
            {Object.entries<string>(data).map(([key, value], index) => (
              <PropertyRow
                key={key}
                name={key}
                value={value}
                even={index % 2 !== 0}
              />
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export function PropertiesTable({ data }: { data: Record<string, any> }) {
  const { type, event, userId, properties, ...rest } = data;
  return (
    <table className="divide-y divide-gray-200">
      <tbody>
        <PropertyRow name="type" value={type} even={true} />
        <PropertyRow name="name" value={event} even={false} />
        <PropertyRow name="userId" value={userId} even={true} />
        <SubTable name="properties" data={properties} event={false} />

        {Object.entries<string>(rest).map(([key, value], index) => (
          <PropertyRow
            key={key}
            name={key}
            value={value}
            even={index % 2 === 0}
          />
        ))}
      </tbody>
    </table>
  );
}
