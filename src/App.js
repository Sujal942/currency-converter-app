import { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./components/hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd"); // 'From' currency default is USD
  const [to, setTo] = useState("inr"); // 'To' currency default is INR
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  useEffect(() => {
    if (currencyInfo.data && currencyInfo.data[to]) {
      setConvertedAmount(amount * currencyInfo.data[to]);
    }
  }, [amount, from, to, currencyInfo.data]);

  const options = currencyInfo.data ? Object.keys(currencyInfo.data) : [];

  const swap = () => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);
    setAmount(convertedAmount); // Optionally, swap the amounts as well
  };

  const convert = () => {
    if (currencyInfo.data && currencyInfo.data[to]) {
      setConvertedAmount(amount * currencyInfo.data[to]);
    }
  };

  const handleFromCurrencyChange = (currency) => {
    setFrom(currency); // Update 'from' state
  };

  const handleToCurrencyChange = (currency) => {
    setTo(currency); // Update 'to' state correctly
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={handleFromCurrencyChange}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={handleToCurrencyChange}
                selectCurrency={to} // 'To' currency default is INR
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
