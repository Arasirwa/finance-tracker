export default function ExpenditureList(props) {
    return (
      <>
        {props.filteredExpenditures.map((expenditure, index) => (
          <tr key={index} className="border-b">
            <td className="p-3">{expenditure.title}</td>
            <td className="p-3">Ksh. {expenditure.amount}</td>
            <td className="p-3">{expenditure.date}</td>
            <td className="p-3">{expenditure.category}</td>
            <td className="p-3">{expenditure.paymentMethod}</td>
            <td className="p-3 flex gap-2">
              {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all">
                View
              </button> */}
              <button
                onClick={() => props.handleDelete(expenditure.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  }
  