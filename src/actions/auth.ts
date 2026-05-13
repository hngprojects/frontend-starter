'use server'

import axios from 'axios'

export const adminLogin = async (values: {
  email: string
  password: string
}) => {
  const baseURL = process.env.BASE_URL
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/auth/admin/log-in`,
      values
    )
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    }
  } catch (error) {
    return {
      success: false,
      message:
        axios.isAxiosError(error)
          ? (error.response?.data?.message ?? error.response?.data?.error ?? 'Something went wrong')
          : 'Something went wrong',
    }
  }
}
