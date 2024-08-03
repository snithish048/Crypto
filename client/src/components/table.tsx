import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function Table({}) {
    const cryptoData = useSelector((state: RootState) => state.crypto.data);
  return (
    <div className="flex justify-center text-white">
      <table className="">
        <thead>
          <tr>
            
            <th>Currency</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((entry) => (
            <tr key={entry._id}>
                
              <td>{entry.symbol}</td>
              <td>{`$${entry.price}`}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
