import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptoData, setSelectedSymbol } from "../store/cryptoSlice";
import { RootState, AppDispatch } from "../store/store";
import Table from "../components/table";


const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cryptoData = useSelector((state: RootState) => state.crypto.data);
  const selectedSymbol = useSelector(
    (state: RootState) => state.crypto.selectedSymbol
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCryptoData(selectedSymbol)); 
    }, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch, selectedSymbol]);

  const coins = ["BITCOIN", "ETHEREUM", "LITECOIN", "RIPPLE", "DOGECOIN"];

  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedSymbol(event.target.value));
  };

  return (
    <>
      <div className="flex flex-row gap-[50%] justify-center">
        <h1 className="text-white font-bold text-[3rem] ">
          Crypto View
        </h1>{" "}
        <div className="flex flex-col justify-center">
          <select
            className="text-black h-[2.5rem] w-[10rem]"
            name="Select currency"
            defaultValue={selectedSymbol}
            onChange={handleSymbolChange}
          >
            {coins.map((data) => (
              <option key={data} value={data.toUpperCase()}>
                {data}
              </option>
            ))}
          </select>
        </div>
      </div>
      {cryptoData[0].symbol === selectedSymbol ? (
        <Table />
      ) : (
        <div className="flex justify-around  text-white text-center h-[25vw]">
          <div className="flex flex-col justify-center text-[1.5rem]">
            Loading...
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
