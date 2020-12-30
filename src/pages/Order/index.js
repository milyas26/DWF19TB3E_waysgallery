import Navbar from '../../components/molecules/Navbar'
import { Table } from 'react-bootstrap'
import './Order.css'
import { useHistory } from 'react-router-dom'
import { API } from '../../config/api'
import { useEffect, useState } from 'react'
import TableRowOrder from '../../components/molecules/TableRowOrder'

const Order = () => {
  const history = useHistory()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  let [dropdown, setDropdown] = useState(false)

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await API(`/my-orders`)

      setOrders(response.data.data.orders)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])


  const handleDropdown = () => {
    setDropdown((dropdown = !dropdown))
  }

  const handleMovePage = () => {
    history.push('/offer')
    setDropdown(false)
  }

  return (
    <div className="container order">
      <Navbar />
      <div className="content">
        <div className="filter order" onClick={handleDropdown}>
          <span>
            My Orders <i className="fas fa-angle-down"></i>
          </span>

          <div
            className="dropdown-bar"
            style={{ display: dropdown ? '' : 'none' }}
          >
            <span onClick={handleMovePage}>My Offers</span>
          </div>
        </div>
        <div className="table">
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Vendor</th>
                <th>Order</th>
                <th>Start Project</th>
                <th>End Project</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row, index) => (
                <TableRowOrder data={row} index={index} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Order
