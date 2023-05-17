import axios, { type AxiosRequestConfig } from 'axios'

import { type ApiResponse } from 'backend/controllers/types'

export const uploadFileRequest = async (formData: FormData/*  progressCallback?: (progressEvent: ProgressEvent) => void */): Promise<ApiResponse<string[]>> => {
    const config: AxiosRequestConfig = {
    headers: { 'content-type': 'multipart/form-data' },
    // onUploadProgress: progressCallback,
    validateStatus: (status) => true
  }
  const response = await axios.post('/api/images', formData, config)

  return response.data
}
