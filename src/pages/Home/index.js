import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/molecules/Navbar'
import Input from '../../components/atoms/Input'
import Thumbnail from '../../components/molecules/Thumbnail'
import { API } from '../../config/api'
import { useHistory } from 'react-router-dom'


const Home = () => {
  const history = useHistory()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  let [dropdown, setDropdown] = useState(false)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await API('/posts')

      setPosts(response.data.data.posts)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDropdown = () => {
    setDropdown((dropdown = !dropdown))
  }

  const handleMovePage = () => {
    history.push('/following')
    setDropdown(false)
  }

  let [search, setSearch] = useState()

  const handleSearch = (e) => {
    let keyword = e.target.value

    setSearch((search = keyword))
  }

  const items = posts
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    .filter((item) => {
      if (search == null) {
        return item
      } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
        return item
      }
    })
    .map((item) => (
      <div className="thumbnail-wrapper" key={item.id}>
        <Thumbnail item={item} />
      </div>
    ))

  return (
    <div className="container home">
      <Navbar />
      <div className="content">
        <div className="filter">
          <div className="data-filter" onClick={handleDropdown}>
            <span>
              Today <i className="fas fa-angle-down"></i>
            </span>

            <div
              className="dropdown-bar"
              style={{ display: dropdown ? '' : 'none' }}
            >
              <span onClick={handleMovePage}>Following</span>
            </div>
          </div>
          <div className="search">
            <Input
              onChange={(e) => handleSearch(e)}
              placeholder="Search"
              fontSize={14}
              height={45}
            />
          </div>
        </div>

        <h4>Today's posts</h4>
        <div className="cards">{items}</div>
      </div>
    </div>
  )
}

export default Home
