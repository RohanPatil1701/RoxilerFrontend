import './index.css'

const Transactions = () => (
  <div className="transactions-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Product 1</td>
          <td>Description 1</td>
          <td>$20.00</td>
          <td>Electronics</td>
          <td>10</td>
          <td>
            <img src="image1.jpg" alt="Product 1" />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Product 2</td>
          <td>Description 2</td>
          <td>$25.00</td>
          <td>Clothing</td>
          <td>15</td>
          <td>
            <img src="image2.jpg" alt="Product 2" />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Product 3</td>
          <td>Description 3</td>
          <td>$30.00</td>
          <td>Home & Garden</td>
          <td>20</td>
          <td>
            <img src="image3.jpg" alt="Product 3" />
          </td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
    <div className="pagination-container">
      <p className="paragraph">Page No: 1</p>
      <div className="next-previous">
        <p className="paragraph-next">Next</p>
        <span>-</span>
        <p className="paragraph-previous">Previous</p>
      </div>
      <p className="paragraph">Per Page: 10</p>
    </div>
  </div>
)

export default Transactions
