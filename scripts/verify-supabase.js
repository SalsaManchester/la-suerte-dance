const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase credentials in environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyConnection() {
    console.log('Testing Supabase connection...');

    // Try to fetch data from a table we know exists from the schema, e.g., 'courses'
    // We expect an empty array or data, but NOT a connection error.
    const { data, error } = await supabase.from('courses').select('count', { count: 'exact', head: true });

    if (error) {
        console.error('Connection failed:', error.message);
        process.exit(1);
    } else {
        console.log('Connection successful! Supabase reachable.');
        console.log('Courses table query result:', data);
    }
}

verifyConnection();
