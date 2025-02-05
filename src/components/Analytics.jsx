export default function Analytics(props) {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
      <h2 className="text-lg font-semibold mb-4">Totals & Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {props.analytics.map((analytic, index) => (
          <div
            className="bg-blue-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            key={index}
          >
            <h3 className="font-medium text-md text-gray-700">
              {analytic.label}
            </h3>
            <span className="text-xl font-bold text-blue-600 mt-2">
              {analytic.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
