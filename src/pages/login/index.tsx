import { Row, Card, Form, Space, Typography } from 'antd'
import Layout from '../../components/layout'
import CustomInput from '../../components/input'
import CustomPassword from '../../components/password-input'
import CustomButton from '../../components/button'
import { Path } from '../../paths'
import { Link, useNavigate } from 'react-router-dom'
import { UserData, useLoginMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { useState } from 'react'
import { ErrorMessage } from '../../components/error-message'

const Login = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()

      navigate('/employees')
    } catch (err) {
      const maybeError = isErrorWithMessage(err)

      if (maybeError) {
        setError(err.data.message)
      } else {
        setError('Невідома помилка')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Вхід' style={{ width: '30rem' }}>
          <Form onFinish={login}>
            <CustomInput type='email' name='email' placeholder='Email' />
            <CustomPassword name='password' placeholder='Пароль' />
            <CustomButton type='primary' htmlType='submit'>
              Увійти
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Немає акаунту? <Link to={Path.register}>Зареєструйтесь!</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Login
