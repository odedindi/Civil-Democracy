import type { Rule, RuleRace } from 'graphql-shield/typings/rules'
import { allow, IRules } from 'graphql-shield'
// import { NexusGenFieldTypes } from '@/generated/nexus-typegen-custom'
import { isAdminRule, isAuthenticatedRule } from './auth'
import {} from 'nexus-prisma'
type Rules = Rule | RuleRace
type FieldPermissions<T> = {
	[K in keyof T]: Permissions<T[K]>
}

type Permissions<T> = ({ '*': Rules } & Partial<FieldPermissions<T>>) | FieldPermissions<T> | Rules

const permissions: Permissions<any> = {
	//NexusGenFieldTypes> = {
	Query: {
		'*': allow,
		me: isAuthenticatedRule,
	},
	Mutation: {
		'*': allow,
	},
	// AuthPayload: {
	// 	'*': allow,
	// },
	User: {
		'*': allow,
	},
	UserPermission: {
		'*': isAuthenticatedRule,
	},
	Permission: {
		'*': isAuthenticatedRule,
	},
	Profile: {
		'*': isAuthenticatedRule,
	},
	BlogPost: {
		'*': allow,
	},
}

export default permissions as IRules
