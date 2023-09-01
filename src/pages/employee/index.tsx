import { useState } from 'react'
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import Layout from '../../components/layout'
import { Descriptions, Divider, Space, Modal } from 'antd'
import CustomButton from '../../components/button'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ErrorMessage } from '../../components/error-message'
import { Path } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

const Employee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id || '')
  const [removeEmployee] = useRemoveEmployeeMutation()
  const user = useSelector(selectUser)

  if (isLoading) {
    return <span>Завантаження</span>
  }

  if (!data) {
    return <Navigate to='/' />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }
  const handleDeleteUser = async () => {
    hideModal()

    try {
      await removeEmployee(data.id).unwrap()

      navigate(`${Path.status}/deleted`)
    } catch (error) {
      const maybeError = isErrorWithMessage(error)

      if (maybeError) {
        setError(error.data.message)
      } else {
        setError('Невідома помилка')
      }
    }
  }

  return (
    <Layout>
      <Descriptions title='Інформація про співробітника' bordered>
        <Descriptions.Item label="Ім'я" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label='Вік' span={3}>
          {`${data.age}`}
        </Descriptions.Item>
        <Descriptions.Item label='Адреса' span={3}>
          {`${data.address}`}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation='left'>Дії</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton shape='round' type='default' icon={<EditOutlined />}>
                Редагувати
              </CustomButton>
            </Link>

            <CustomButton shape='round' danger onClick={showModal} icon={<DeleteOutlined />}>
              Видалити
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />

      <Modal
        title='Підтвердіть видалення'
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText='Підтвердити'
        cancelText='Скасувати'
      >
        Ви дійсно хочете видалити співробітника?
      </Modal>
    </Layout>
  )
}

export default Employee
