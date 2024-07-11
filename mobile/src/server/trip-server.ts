import { api } from "./api"

export type TripDetail = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

type TripCreate = Omit<TripDetail, "id" | "is_confirmed"> & {
  emails_to_invite: string[]
}

async function getById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetail }>(`/trips/${id}`)
    return data.trip
  } catch (error) {
    throw error
  }
}

async function create({
  destination,
  starts_at,
  ends_at,
  emails_to_invite,
}: TripCreate) {
  try {
    const { data } = await api.post<{ tripId: string }>("/trips", {
      destination,
      starts_at,
      ends_at,
      emails_to_invite,
      owner_name: "Renato Rebouças",
      owner_email: "renato.reboucas@gmail.com",
    })
    return data
  } catch (error) {
    throw error
  }
}

export const tripServer = { getById, create }
