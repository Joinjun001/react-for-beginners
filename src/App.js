import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState(0);
  const [coinName, setCoinName] = useState("");
  const [coinValue, setCoinValue] = useState(0);
  const [money, setMoney] = useState(0);

  const onSelectChange = (event) => {
    const coinInfo = event.target.value;
    let coinInfoSplit = coinInfo.split(/:/);
    setCoinName(coinInfoSplit[0]);
    setCoinValue(coinInfoSplit[1].split(" ")[2]);
    if (coinName !== "") {
      setMoney(usd / coinValue);
    }
  };
  const onUSDChange = (event) => {
    setUsd(event.target.value);
    setMoney(usd / coinValue);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelectChange}>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : $ {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}

      <hr />
      <div>
        <span>
          <input
            value={usd}
            onChange={onUSDChange}
            placeholder="Input your USD"
            type="number"
          />
          <label>USD</label>
        </span>
        <br />
        <span>
          <input value={money} type="number" disabled={true} />
          <label>{coinName}</label>
        </span>
      </div>
    </div>
  );
}

export default App;
