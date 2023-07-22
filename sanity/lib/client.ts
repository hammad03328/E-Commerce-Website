import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId, useCdn, } from '../env'

// export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
// export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
// export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION // "2023-01-01"

export const client = createClient({
  apiVersion:"2023-05-29",
  dataset:"production",
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token:process.env.NEXT_PUBLIC_SANITY_ACCESS_TOKEN,
  // projectId:process.env.SANITY_PROJECT_ID,
  // token:process.env.SANITY_ACCESS_TOKEN,
  useCdn : true,
})
