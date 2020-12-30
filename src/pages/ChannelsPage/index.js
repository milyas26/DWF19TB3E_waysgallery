// React Packages
import { useEffect, useState } from 'react'

// Components
import ChannelItem from '../../components/atoms/ChannelItem'
import MainComponent from '../../components/molecules/MainComponent'

// API
import { API } from '../../config/api'

// CSS
import './ChannelsPage.css'

const ChannelsPage = () => {
  const [channels, setChannels] = useState('')

  const fetchChannel = async () => {
    try {
      const channel = await API(`/channels`)

      setChannels(channel.data.data.channels)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChannel()
  }, [])

  // UPDATE SUBSCRIPTIONS
  const [subscriptions, setSubscriptions] = useState('')
  const updateSubscriptions = async () => {
    try {
      const channel = await API(`/subscribtion`)
      setSubscriptions(channel.data.data.subscribtion)
    } catch (err) {
      console.log(err)
    }
  }

  let [search, setSearch] = useState()

  const handleSearch = (e) => {
    let keyword = e.target.value

    setSearch((search = keyword))
  }

  const channel =
    channels &&
    channels
      .filter((item) => {
        if (search == null) {
          return item
        } else if (
          item.channelName.toLowerCase().includes(search.toLowerCase())
        ) {
          return item
        }
      })
      .map((item) => (
        <div className="channels-item" key={item.id}>
          <ChannelItem item={item} />
        </div>
      ))

  return (
    <div className="home">
      <MainComponent
        isAllChannels
        onChange={(e) => handleSearch(e)}
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
      />
      <div className="container-page">
        <div className="title-wrapper">
          <h2>ALL CHANNELS</h2>
        </div>
        {channel}
      </div>
    </div>
  )
}

export default ChannelsPage
