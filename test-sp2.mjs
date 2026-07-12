import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://haezqrxfepysuotkikxw.supabase.co', 'sb_publishable_lNG6eG-WiW2QBcz8FGl-jw_jDz_OeFZ')
const { data, error } = await supabase.from('products').select('*, artisan_profiles(*)').limit(8)
console.log(error || "Success")
