import Navbar from '../../components/molecules/Navbar'
import { Table } from 'react-bootstrap'
import './Offer.css'
import { useHistory } from 'react-router-dom'
import { API } from '../../config/api'
import { useEffect, useState } from 'react'
import TableRowOffer from '../../components/molecules/TableRowOffer'

const Offer = () => {
  const history = useHistory()
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  let [dropdown, setDropdown] = useState(false)

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await API(`/my-offers`)

      setOffers(response.data.data.offers)
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
    history.push('/order')
    setDropdown(false)
  }

  // Update Table
  const updateTableOffer = async () => {
    try {
      setLoading(true)
      const response = await API(`/my-offers`)
      setOffers(response.data.data.offers)
      setLoading(false)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container order">
      <Navbar />
      <div className="content">
        <div className="filter offer" onClick={handleDropdown}>
          <span>
            My Offers <i className="fas fa-angle-down"></i>
          </span>

          <div
            className="dropdown-bar"
            style={{ display: dropdown ? '' : 'none' }}
          >
            <span onClick={handleMovePage}>My Orders</span>
          </div>
        </div>
        <div className="table">
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Client</th>
                <th>Order</th>
                <th>Start Project</th>
                <th>End Project</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((row, index) => (
                <TableRowOffer
                  data={row}
                  index={index}
                  updateTable={updateTableOffer}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Offer
