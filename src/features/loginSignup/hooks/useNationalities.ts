import { useQuery } from '@tanstack/react-query'

export const useNationalities = () => {
	return useQuery({
		queryKey: ['Allnationalities'],
		queryFn: async () => {
			const res = await fetch(
				'https://gist.githubusercontent.com/marijn/274449/raw/0045fb5f54f9ad357e301cf30e23d9834058618a/nationalities.txt',
			)
			return (await res.text())?.split(/\r?\n/)
		},
	})
}
