const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing connection to:', url);

async function test() {
  const supabase = createClient(url, key);
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
      console.error('Connection failed (Supabase Error):', error.message);
    } else {
      console.log('Connection successful!');
    }
  } catch (err) {
    console.error('Connection failed (Fetch Error):', err.message);
  }
}

test();
