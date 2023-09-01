import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees'
import Layout from '../../components/layout'
import { EmployeeForm } from '../../components/employee-form'
import { Row } from 'antd'
import { Employee } from '@prisma/client'
import { Path } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [error, setError] = useState('')
  const { data, isLoading } = useGetEmployeeQuery(params.id || '')
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return <span>Завантаження</span>
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      }

      await editEmployee(editedEmployee).unwrap()

      navigate(`${Path.status}/updated`)
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
      <Row align='middle' justify='center'>
        <EmployeeForm
          title='Редагувати співробітника'
          btnText='Редагувати'
          error={error}
          employee={data}
          onFinish={handleEditUser}
        ></EmployeeForm>
      </Row>
    </Layout>
  )
}

export default EditEmployee
