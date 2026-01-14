
const url = 'http://localhost:3000/api/movies/genre/movie/list';

async function testParams() {
    try {
        const res = await fetch(url);
        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testParams();
