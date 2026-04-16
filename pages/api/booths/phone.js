import dbConnect from '../../../lib/mongodb';
import VoterList from '../../../models/voterList';

const BOOTH_SETS = {
  "100":   [191, 192, 195, 198, 199, 200, 201], // Covers 100 & 100A
  "100BC": [76, 77, 78, 193, 194, 196, 197],    // Covers 100B & 100C
  "100D":  [82, 83],                            // Covers 100D
};


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const phone = String(req.query.phone);
    const booth = req.query.booth;

    console.log('Search parameters:', { phone, booth }); // Debug log

    // Create query to search in both Phone and Govt_Phone fields
    let query = {
      $or: [
        { Phone: phone },      // Exact match in Phone field
        { Phone: phone }  // Exact match in Govt_Phone field
      ]
    };

    // Add booth filter if specified
    if (booth && booth !== 'all') {
      let boothNumbers;

      if (BOOTH_SETS[booth]) {
        // Named set like "100" or "100A"
        boothNumbers = BOOTH_SETS[booth];
      } else if (booth.includes(',')) {
        // Comma-separated list
        boothNumbers = booth.split(',').map(Number);
      } else {
        // Single booth number
        boothNumbers = [parseInt(booth)];
      }

      query = {
        $and: [
          query,
          { Booth: { $in: boothNumbers } }
        ]
      };
    }

    console.log('MongoDB query:', JSON.stringify(query, null, 2)); // Debug log

    const results = await VoterList.find(query);
    
    console.log('Query result count:', results.length); // Debug log

    // Always return 200 with results, even if empty
    res.status(200).json(results);

  } catch (error) {
    console.error('Error retrieving voters by phone:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}