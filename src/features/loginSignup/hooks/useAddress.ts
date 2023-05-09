import { useQuery } from '@tanstack/react-query'

export type NominatimResponse = {
	place_id: number
	licence: string
	osm_type: string
	osm_id: number
	boundingbox: number[]
	lat: number
	lon: number
	display_name: string
	class: string
	type: string
	importance: number
	icon: string
}

export const useAddress = (query: string) => {
	return useQuery<NominatimResponse[]>({
		queryKey: ['addresses', query],
		queryFn: async () => {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
			)
			const data = await response.json()
			return data
		},
	})
}
