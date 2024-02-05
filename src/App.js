import Transactions from './components/Transactions'
import Statistics from './components/Statistics'
import TransactionBarChart from './components/TransactionBarChart'

import './App.css'

const App = () => (
  <div className="background-container">
    <div className="dashboard-container">
      <h1 className="heading">
        Transaction <br />
        Dashboard
      </h1>
    </div>

    <div className="search-and-select-container">
      <button className="search-transactions" type="button">
        Search Transaction
      </button>
      <div className="select-month-container">
        <button type="button" className="select-month">
          Select Month
        </button>
        <select className="select-container">
          <option className="options">January</option>
          <option className="options">February</option>
          <option className="options" selected="March">
            March
          </option>
          <option className="options">April</option>
          <option className="options">May</option>
          <option className="options">June</option>
          <option className="options">July</option>
          <option className="options">August</option>
          <option className="options">September</option>
          <option className="options">October</option>
          <option className="options">November</option>
          <option className="options">December</option>
        </select>
      </div>
    </div>
    <Transactions />
    <Statistics />
    <TransactionBarChart />
  </div>
)

export default App
