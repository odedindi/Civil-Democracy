import { objectType } from 'nexus'

import { BlogPost as BlogPostNexus } from 'nexus-prisma'

export const BlogPostType = objectType({
	name: BlogPostNexus.$name,
	description: BlogPostNexus.$description,
	definition(t) {
		t.field(BlogPostNexus.id)
		t.field(BlogPostNexus.title)
		t.field(BlogPostNexus.content)
		t.field(BlogPostNexus.published)
		t.field(BlogPostNexus.author)
		t.field(BlogPostNexus.authorId)
		t.field(BlogPostNexus.createdAt)
		t.field(BlogPostNexus.updatedAt)
		// t.field(BlogPostNexus.comments)
	},
})
