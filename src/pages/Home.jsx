import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import NewExpenditureForm from "../components/NewExpenditureForm";
import ExpenditureList from "../components/ExpenditureList";
import Analytics from "../components/Analytics";

export default function Home() {
  const [expenditureList, setExpenditureList] = useState([]);
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(true);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This expenditure will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/expenditures/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete expenditure");
            }

            // Update state by filtering out the deleted item
            setExpenditureList((prev) =>
              prev.filter((expenditure) => expenditure.id !== id)
            );

            setFilteredExpenditures((prev) =>
              prev.filter((expenditure) => expenditure.id !== id)
            );

            Swal.fire(
              "Deleted!",
              "Your expenditure has been deleted.",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire("Error", "Could not delete expenditure", "error");
            console.error("Error deleting expenditure:", error);
          });
      }
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      // Reset everything when search is cleared
      setFilteredExpenditures(expenditureList);
      setShowForm(true); // Show the form again
      setShowAnalytics(true); // Show analytics again
    } else {
      // Filter expenditures based on the query
      const filteredList = expenditureList.filter((expenditure) =>
        (
          expenditure.title.toLowerCase() ||
          expenditure.category.toLowerCase() ||
          expenditure.description.toLowerCase()
        ).includes(query.toLowerCase())
      );

      setFilteredExpenditures(filteredList);
      setShowForm(false);
      setShowAnalytics(false);
    }
  };

  useEffect(() => {
    if (expenditureList.length === 0 && !searchQuery) {
      // Fetch expenditures from the API when the list is empty
      fetch("http://localhost:8000/expenditures")
        .then((response) => response.json())
        .then((data) => {
          setExpenditureList(data); // Initialize the expenditure list
          setFilteredExpenditures(data); // Initialize the filtered list
        })
        .catch((error) => {
          console.log("Error fetching expenditures", error);
        });
    }
  }, [expenditureList.length, searchQuery]); // Run this effect if either the expenditure list or searchQuery changes

  useEffect(() => {
    if (expenditureList.length === 0) return;

    const showAnalytics = () => {
      // Total Expenditure
      const totalExpenditure = parseFloat(
        expenditureList.reduce((sum, item) => sum + (item.amount || 0), 0)
      ).toFixed(2);

      // Highest Expense
      const highestExpense = parseFloat(
        expenditureList.length > 0
          ? Math.max(...expenditureList.map((item) => item.amount || 0))
          : 0
      ).toFixed(2);

      // Most Frequent Category
      let categoryCount = {};
      let mostFrequentCategory = "";
      let maxCategoryCount = 0;

      expenditureList.forEach(({ category }) => {
        if (category) {
          categoryCount[category] = (categoryCount[category] || 0) + 1;

          if (categoryCount[category] > maxCategoryCount) {
            maxCategoryCount = categoryCount[category];
            mostFrequentCategory = category;
          }
        }
      });

      // Most Used Payment Method
      let paymentMethodCount = {};
      let mostFrequentPaymentMethod = "";
      let maxPaymentMethodCount = 0;

      expenditureList.forEach(({ paymentMethod }) => {
        if (paymentMethod) {
          paymentMethodCount[paymentMethod] =
            (paymentMethodCount[paymentMethod] || 0) + 1;

          if (paymentMethodCount[paymentMethod] > maxPaymentMethodCount) {
            maxPaymentMethodCount = paymentMethodCount[paymentMethod];
            mostFrequentPaymentMethod = paymentMethod;
          }
        }
      });

      const newAnalytics = [
        { label: "Total Expenditures", value: `Ksh: ${totalExpenditure}` },
        { label: "Highest Expense", value: `Ksh: ${highestExpense}` },
        {
          label: "Most Frequent Category",
          value: mostFrequentCategory || "N/A",
        },
        {
          label: "Most Used Payment Method",
          value: mostFrequentPaymentMethod || "N/A",
        },
      ];

      setAnalytics(newAnalytics);
    };

    showAnalytics();
  }, [expenditureList]);

  const addNewExpenditure = (formData) => {
    const newExpenditure = Object.fromEntries(formData);
    const amount = parseFloat(newExpenditure.amount);
    newExpenditure.amount = amount;

    fetch("http://localhost:8000/expenditures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpenditure),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Failed to add expenditure");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Expenditure added successfully",
          icon: "success",
        });
        setExpenditureList((prevExpenditures) => [...prevExpenditures, data]);
        setFilteredExpenditures((prevExpenditures) => [
          ...prevExpenditures,
          data,
        ]); // Also add the new expenditure to filtered list
      })
      .catch((error) => {
        Swal.fire({
          title: "Something went wrong",
          text: "Expenditure not added",
          icon: "error",
        });
        console.error("Error", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Search handleSearch={handleSearch} searchQuery={searchQuery} />

      <div className="mt-6 flex flex-wrap md:flex-nowrap gap-6">
        {showForm && (
          <section className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
            <h2 className="text-lg font-bold mb-4">Add Expenditure</h2>
            <NewExpenditureForm addNewExpenditure={addNewExpenditure} />
          </section>
        )}

        {showAnalytics && <Analytics analytics={analytics} />}
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4">Expenditures</h2>
        <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Payment Method</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenditures.length ? (
                <ExpenditureList
                  handleDelete={handleDelete}
                  filteredExpenditures={filteredExpenditures}
                />
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    No expenditures found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
