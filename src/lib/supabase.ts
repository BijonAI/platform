import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gppcjiwuyqyndxmzkfiw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwcGNqaXd1eXF5bmR4bXprZml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MzIyNTYsImV4cCI6MjA1NjMwODI1Nn0.6JPtIhpwKuXH-Iu4mvJWeo_ZST72lALVsdJgXEKv3b8'

export const supabase = createClient(supabaseUrl, supabaseKey) 