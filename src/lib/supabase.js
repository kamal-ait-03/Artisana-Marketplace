import { createClient } from '@supabase/supabase-js'

// We strip /rest/v1/ if it was accidentally included in the .env, as createClient needs the base URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/rest\/v1\/?$/, '') || import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Utility to handle image uploads to 'avatars' or 'product-images' buckets
export const uploadImage = async (file, bucket = 'product-images') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}-${Date.now()}.${fileExt}`
  const filePath = fileName

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}
