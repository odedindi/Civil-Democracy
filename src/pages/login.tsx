import Login from '@/features/LoginPage'
import { makeStaticProps } from '@/utils/makeStaticProps'

const LoginPage: React.FC = () => <Login />

export default LoginPage

export const getStaticProps = makeStaticProps()
