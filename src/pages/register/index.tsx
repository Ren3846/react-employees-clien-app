import { Row, Card, Form, Space, Typography } from 'antd'
import Layout from '../../components/layout'
import CustomInput from '../../components/input'
import CustomPassword from '../../components/password-input'
import CustomButton from '../../components/button'
import { Path } from '../../paths'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useRegisterMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { selectUser } from '../../features/auth/authSlice'
import { User } from '@prisma/client'
import { ErrorMessage } from '../../components/error-message'

type RegisterData = Omit<User, 'id'> & { confirmPassword: string }

const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [error, setError] = useState('')
  const [registerUser] = useRegisterMutation()

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()

      navigate('/')
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
        <Card title='Реєстрація' style={{ width: '30rem' }}>
          <Form onFinish={register}>
            <CustomInput name='name' placeholder="Ім'я" />
            <CustomInput name='secondName' placeholder='Прізвіще' />
            <CustomInput type='email' name='email' placeholder='Email' />
            <CustomPassword name='password' placeholder='Пароль' />
            <CustomPassword name='confirmPassword' placeholder='Повтoрiть пароль' />
            <CustomButton type='primary' htmlType='submit'>
              Зареєструватись
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Вже зареєстровані? <Link to={Path.register}>Увійдіть!</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Register
