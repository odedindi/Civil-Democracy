/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
}

export type Query = {
	__typename?: 'Query'
	me?: Maybe<User>
	users: Array<User>
}

export type User = {
	__typename?: 'User'
	description?: Maybe<Scalars['String']>
	email: Scalars['String']
	id: Scalars['ID']
	image?: Maybe<Scalars['String']>
	name: Scalars['String']
	password?: Maybe<Scalars['String']>
}

export enum UserRole {
	Admin = 'ADMIN',
	Openactor = 'OPENACTOR',
	User = 'USER',
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
	__typename?: 'Query'
	me?: {
		__typename?: 'User'
		id: string
		name: string
		email: string
		image?: string | null
	} | null
}

export const MeDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Me' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'me' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'image' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>
