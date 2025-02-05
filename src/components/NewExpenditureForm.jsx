export default function NewExpenditureForm( props) {
  return (
    <form className="grid grid-cols-2 gap-4" action={props.addNewExpenditure}>
      <label className="flex flex-col">
        Expenditure:
        <input
          type="text"
          name="title"
          className="border p-2 rounded-md"
          required
        />
      </label>

      <label className="flex flex-col">
        Amount:
        <input
          type="number"
          name="amount"
          min="0"
          className="border p-2 rounded-md"
          required
        />
      </label>

      <label className="flex flex-col">
        Date:
        <input
          type="date"
          name="date"
          className="border p-2 rounded-md"
          required
        />
      </label>

      <label className="flex flex-col">
        Category:
        <select className="border p-2 rounded-md" name="category">
          <option>---Choose Category---</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </label>

      <fieldset className="border p-3 rounded-md col-span-2">
        <legend className="font-semibold">Payment Method</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="paymentMethod" value="Cash" /> Cash
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="paymentMethod" value="Credit Card" />
            Credit Card
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="paymentMethod" value="Debit Card" />
            Debit Card
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="paymentMethod" value="PayPal" />
            PayPal
          </label>
        </div>
      </fieldset>

      <label className="flex flex-col col-span-2">
        Description:
        <textarea
          className="border p-2 rounded-md h-20"
          name="description"
          placeholder="expenditure description.."
          required
        ></textarea>
      </label>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md col-span-2 hover:bg-green-600 transition-all"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
