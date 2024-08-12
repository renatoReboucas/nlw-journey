
import { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { TripDetail, tripServer } from '@/server/trip-server'
import { Loading } from '@/components/loading'
import { Input } from '@/components/input'
import { MapPin, Settings2 } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import dayjs from 'dayjs'
import { Button } from '@/components/button'

type TripData = TripDetail & { when: string }
export default function Trip() {
  // LOADING
  const [isLoadinTrip, setIsLoadinTrip] = useState(true)

  // DATA
  const [tripDetails, setTripDetails] = useState({} as TripData)
  const tripId = useLocalSearchParams<{ id: string }>().id

  async function getTripDetails() {
    try {
      setIsLoadinTrip(true)
      if (!tripId) {
        return router.back()
      }
      const trip = await tripServer.getById(tripId)

      const maxLengthDestination = 14
      const destination =
        trip.destination.length > maxLengthDestination
          ? trip.destination.slice(0, maxLengthDestination) + '...'
          : trip.destination

      const start_at = dayjs(trip.starts_at).format('DD')
      const ends_at = dayjs(trip.ends_at).format('DD')
      const month = dayjs(trip.starts_at).format('MMM')
      setTripDetails({
        ...trip,
        when: `${destination} de ${start_at} a ${ends_at} de ${month}.`,
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadinTrip(false)
    }
  }

  useEffect(() => {
    getTripDetails()
  }, [])
  if (isLoadinTrip) {
    return <Loading />
  }
  return (
    <View className="flex-1 px-5 pt-16">
      <Input variant="tertiary">
        <MapPin color={colors.zinc[400]} size={20} />
        <Input.Field value={tripDetails.when} readOnly />
        <TouchableOpacity
          activeOpacity={0.6}
          className="size-9 bg-zinc-800 items-center justify-center rounded"
        >
          <Settings2 color={colors.zinc[400]} size={20} />
        </TouchableOpacity>
      </Input>

      <View className="w-full absolute -bottom-1 self-center justify-end pb-5 z-10 bg-zinc-950">
        <View className="w-full flex-row bg-zinc-900 p-4 rounded-lg border border-zinc-800 gap-2">
          <Button className="flex-1">
            <Button.Title>Atividades</Button.Title>
          </Button>
          <Button className="flex-1">
            <Button.Title>Detalhes</Button.Title>
          </Button>
        </View>
      </View>
    </View>
  )
}
