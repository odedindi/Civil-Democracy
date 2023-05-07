/* eslint-disable */
import type {
	Prisma,
	User,
	Permission,
	UserPermission,
	Profile,
	BlogPost,
	Category,
} from '@prisma/client'
export default interface PrismaTypes {
	User: {
		Name: 'User'
		Shape: User
		Include: Prisma.UserInclude
		Select: Prisma.UserSelect
		OrderBy: Prisma.UserOrderByWithRelationInput
		WhereUnique: Prisma.UserWhereUniqueInput
		Where: Prisma.UserWhereInput
		Create: {}
		Update: {}
		RelationName: 'blogPost' | 'permission' | 'profile' | 'userPermissions'
		ListRelations: 'blogPost' | 'permission' | 'userPermissions'
		Relations: {
			blogPost: {
				Shape: BlogPost[]
				Name: 'BlogPost'
			}
			permission: {
				Shape: Permission[]
				Name: 'Permission'
			}
			profile: {
				Shape: Profile | null
				Name: 'Profile'
			}
			userPermissions: {
				Shape: UserPermission[]
				Name: 'UserPermission'
			}
		}
	}
	Permission: {
		Name: 'Permission'
		Shape: Permission
		Include: Prisma.PermissionInclude
		Select: Prisma.PermissionSelect
		OrderBy: Prisma.PermissionOrderByWithRelationInput
		WhereUnique: Prisma.PermissionWhereUniqueInput
		Where: Prisma.PermissionWhereInput
		Create: {}
		Update: {}
		RelationName: 'user' | 'userPermission'
		ListRelations: never
		Relations: {
			user: {
				Shape: User
				Name: 'User'
			}
			userPermission: {
				Shape: UserPermission | null
				Name: 'UserPermission'
			}
		}
	}
	UserPermission: {
		Name: 'UserPermission'
		Shape: UserPermission
		Include: Prisma.UserPermissionInclude
		Select: Prisma.UserPermissionSelect
		OrderBy: Prisma.UserPermissionOrderByWithRelationInput
		WhereUnique: Prisma.UserPermissionWhereUniqueInput
		Where: Prisma.UserPermissionWhereInput
		Create: {}
		Update: {}
		RelationName: 'permissions' | 'user'
		ListRelations: 'permissions'
		Relations: {
			permissions: {
				Shape: Permission[]
				Name: 'Permission'
			}
			user: {
				Shape: User
				Name: 'User'
			}
		}
	}
	Profile: {
		Name: 'Profile'
		Shape: Profile
		Include: Prisma.ProfileInclude
		Select: Prisma.ProfileSelect
		OrderBy: Prisma.ProfileOrderByWithRelationInput
		WhereUnique: Prisma.ProfileWhereUniqueInput
		Where: Prisma.ProfileWhereInput
		Create: {}
		Update: {}
		RelationName: 'user'
		ListRelations: never
		Relations: {
			user: {
				Shape: User
				Name: 'User'
			}
		}
	}
	BlogPost: {
		Name: 'BlogPost'
		Shape: BlogPost
		Include: Prisma.BlogPostInclude
		Select: Prisma.BlogPostSelect
		OrderBy: Prisma.BlogPostOrderByWithRelationInput
		WhereUnique: Prisma.BlogPostWhereUniqueInput
		Where: Prisma.BlogPostWhereInput
		Create: {}
		Update: {}
		RelationName: 'author' | 'categories'
		ListRelations: 'categories'
		Relations: {
			author: {
				Shape: User | null
				Name: 'User'
			}
			categories: {
				Shape: Category[]
				Name: 'Category'
			}
		}
	}
	Category: {
		Name: 'Category'
		Shape: Category
		Include: Prisma.CategoryInclude
		Select: Prisma.CategorySelect
		OrderBy: Prisma.CategoryOrderByWithRelationInput
		WhereUnique: Prisma.CategoryWhereUniqueInput
		Where: Prisma.CategoryWhereInput
		Create: {}
		Update: {}
		RelationName: 'posts'
		ListRelations: 'posts'
		Relations: {
			posts: {
				Shape: BlogPost[]
				Name: 'BlogPost'
			}
		}
	}
}
