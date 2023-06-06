export type VoteQuery = {
	id: string
	title: string
	description: { subtitle: string; text: string }
	proposedResolution: {
		title: string
		description: string
		avatar: string
		supporters: { name: string; avatar: string; comments: unknown[] }[]
	}[]
}
